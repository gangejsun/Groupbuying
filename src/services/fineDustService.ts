import { z } from 'zod';

const SERVICE_KEY = import.meta.env.VITE_PUBLIC_DATA_SERVICE_KEY || '';
const BASE_URL = 'https://apis.data.go.kr/B552584/ArpltnStatsSvc';

const CITY_MAP: Record<string, string> = {
    '서울': 'seoul',
    '부산': 'busan',
    '대구': 'daegu',
    '인천': 'incheon',
    '광주': 'gwangju',
    '대전': 'daejeon',
    '울산': 'ulsan',
    '경기': 'gyeonggi',
    '강원': 'gangwon',
    '충북': 'chungbuk',
    '충남': 'chungnam',
    '전북': 'jeonbuk',
    '전남': 'jeonnam',
    '경북': 'gyeongbuk',
    '경남': 'gyeongnam',
    '제주': 'jeju',
    '세종': 'sejong',
};

export const FineDustResponseSchema = z.object({
    response: z.object({
        header: z.object({
            resultCode: z.string(),
            resultMsg: z.string(),
        }),
        body: z.object({
            items: z.array(z.any()), // Use any for items to handle flexible fields
            totalCount: z.union([z.number(), z.string()]),
        }),
    }),
});

export type FineDustResponse = z.infer<typeof FineDustResponseSchema>;

export type FineDustLevel = 'GOOD' | 'NORMAL' | 'BAD' | 'VERY_BAD' | 'UNKNOWN';

export const getFineDustLevel = (value: number): FineDustLevel => {
    if (value <= 15) return 'GOOD';
    if (value <= 35) return 'NORMAL';
    if (value <= 75) return 'BAD';
    return 'VERY_BAD';
};

export class FineDustService {
    static async getSidoFineDust(sidoName: string = '서울'): Promise<FineDustLevel> {
        if (!SERVICE_KEY) {
            console.error('API Service Key is missing in environment variables');
            return 'UNKNOWN';
        }

        try {
            const params = new URLSearchParams({
                serviceKey: SERVICE_KEY,
                returnType: 'json',
                numOfRows: '1',
                pageNo: '1',
                itemCode: 'PM25',
                dataGubun: 'HOUR',
                searchCondition: 'MONTH'
            });

            const url = `${BASE_URL}/getCtprvnMesureLIst?${params.toString()}`;

            const response = await fetch(url);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API fetch failed: ${response.status} ${response.statusText} ${errorText}`);
            }

            const rawData = await response.json();

            const validated = FineDustResponseSchema.parse(rawData);
            const item = validated.response.body.items[0];

            if (!item) {
                console.warn('No items found in fine dust API response');
                return 'UNKNOWN';
            }

            // Map Korean sido name to English key used by the API
            const cityKey = CITY_MAP[sidoName] || 'seoul';
            const pm25Value = item[cityKey];

            if (!pm25Value || pm25Value === '-') {
                return 'UNKNOWN';
            }

            const value = parseInt(pm25Value, 10);
            return isNaN(value) ? 'UNKNOWN' : getFineDustLevel(value);
        } catch (error) {
            console.error('Error fetching fine dust data:', error);
            return 'UNKNOWN';
        }
    }
}
