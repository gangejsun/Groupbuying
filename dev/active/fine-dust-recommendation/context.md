# context.md

## Purpose
The Fine Dust Recommendation service provides real-time PM2.5 (ultra-fine dust) information and suggests relevant products (e.g., masks, air purifiers, outdoor gear) to users.

## Scope
- Fetch real-time air quality data from the Korea Environment Corporation (AirKorea) via the Public Data Portal.
- Categorize air quality into four levels: Good, Normal, Bad, Very Bad.
- Map these levels to specific product categories for recommendation.

## Technical Details
- **Base Endpoint**: `https://apis.data.go.kr/B552584/ArpltnStatsSvc`
- **Service Key**: `O5BPks4ZPmopj8qgvOcNk%2F3K0qT25xq56VnpK3Ze3nhhe6kAQ%2BDypJsYwb21KqfgMIPhQvn0tLyUu2MzkTgkAg%3D%3D`
- **Operation**: `getCtprvnMesureLIst` (Sido-wide average)
- **Target Value**: `pm25Value` (Ultra-fine dust concentration).

## Constraints
- Requires a Public Data Portal API Key (`serviceKey`).
- Data update frequency is usually hourly.
