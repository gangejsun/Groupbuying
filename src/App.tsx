import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, MapPin, User, Flame, ArrowLeft } from 'lucide-react'

import { UrlInput } from './features/deal/components/UrlInput'
import { ProductPreviewCard } from './features/deal/components/ProductPreviewCard'
import { DealOptionForm } from './features/deal/components/DealOptionForm'
import { RadarScanner } from './features/map/components/RadarScanner'
import { NeighborList } from './features/map/components/NeighborList'
import { PaymentCard } from './features/payment/components/PaymentCard'
import { ReceiptModal } from './features/payment/components/ReceiptModal'
import { FineDustAlert } from './features/deal/components/FineDust/FineDustAlert'
import { RecommendedDustProducts } from './features/deal/components/FineDust/RecommendedDustProducts'
import type { FineDustLevel } from './services/fineDustService'

import { useAppStore } from './store/useAppStore'
import { useUrlParser } from './features/deal/hooks/useUrlParser'
import { useGeoSimulation } from './features/map/hooks/useGeoSimulation'
import { useVirtualPayment } from './features/payment/hooks/useVirtualPayment'

import type { Deal } from './mocks/types'
import { cn } from './lib/utils'

function App() {
  const [step, setStep] = useState<'home' | 'preview' | 'matching' | 'payment'>('home')
  const [targetCount, setTargetCount] = useState(2)
  const [dustLevel, setDustLevel] = useState<FineDustLevel>('UNKNOWN')

  const { activeDeal, setActiveDeal, currentUser, resetDeal } = useAppStore()
  const { product, loading: parsingLoading, parseUrl, resetProduct } = useUrlParser()
  const { registerCard } = useVirtualPayment()

  // Activate Simulation
  useGeoSimulation()

  // State Sync
  useEffect(() => {
    if (activeDeal?.status === 'processing') {
      setStep('payment')
    }
  }, [activeDeal?.status])

  const handleStartDeal = () => {
    if (!product) return
    const newDeal: Deal = {
      id: Math.random().toString(36).substr(2, 9),
      hostId: currentUser.id,
      product: product,
      targetCount: targetCount,
      participants: [currentUser],
      status: 'recruiting',
      createdAt: new Date(),
    }
    setActiveDeal(newDeal)
    setStep('matching')
  }

  const handleRestart = () => {
    resetDeal()
    resetProduct()
    setStep('home')
    setTargetCount(2)
  }

  return (
    <div className="min-h-screen bg-background text-text-primary selection:bg-primary/10 font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-surface/80 backdrop-blur-md h-14 border-b border-border-light flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-1" onClick={handleRestart}>
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-white font-heavy cursor-pointer" onClick={() => {
            if (window.confirm("Trigger Sentry test error?")) {
              throw new Error("Sentry Test Error from Antigravity");
            }
          }}>N</div>
          <h1 className="text-xl font-heavy text-text-primary tracking-tighter cursor-pointer">N-BOX</h1>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[9px] text-text-tertiary font-heavy">STATION</span>
          <span className="text-caption font-bold text-text-primary flex items-center gap-0.5">
            <MapPin size={10} className="text-secondary" />
            서울 역삼동
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-28 px-4 max-w-md mx-auto min-h-screen flex flex-col">
        <AnimatePresence mode="wait">

          {/* STEP 1: HOME */}
          {step === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6 flex-1"
            >
              <div className="bg-secondary rounded-3xl p-6 text-text-inverse relative overflow-hidden shadow-lg shadow-secondary/20">
                <div className="relative z-10">
                  <span className="inline-block px-2.5 py-0.5 bg-white/20 rounded-full text-[10px] font-heavy mb-2 tracking-wider">
                    MVP v1.0
                  </span>
                  <h2 className="text-[26px] font-heavy mb-2 leading-[1.1]">
                    나누면 반값,<br />필요한 만큼만!
                  </h2>
                  <p className="text-white/80 text-caption font-medium">
                    도매 상품 URL을 붙이고 이웃과 함께 사세요.
                  </p>
                </div>
                <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-white/10 rounded-full blur-3xl" />
                <Flame className="absolute -right-3 -top-3 w-28 h-28 text-white/10 rotate-12" />
              </div>

              <section className="space-y-4">
                <UrlInput onParse={(url) => {
                  parseUrl(url).then(() => {
                    // Wait for product state update, handled by effect or simple check
                    // Since parseUrl is async, we can check result here or rely on 'product' state change
                    setStep('preview')
                  })
                }} isLoading={parsingLoading} />
              </section>

              {/* Fine Dust Section */}
              <section className="space-y-4">
                <FineDustAlert onLevelChange={setDustLevel} />
                <RecommendedDustProducts level={dustLevel} />
              </section>

              {/* Feature Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface p-5 rounded-2xl border border-border-light shadow-sm flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-accent-promo-green rounded-2xl flex items-center justify-center mb-3">
                    <ShoppingCart className="text-accent-success" size={24} />
                  </div>
                  <h4 className="font-bold text-body-md mb-1">제로 웨이스트</h4>
                  <p className="text-text-tertiary text-[11px] leading-tight">자취생에게 딱 맞는<br />소분 구매</p>
                </div>
                <div className="bg-surface p-5 rounded-2xl border border-border-light shadow-sm flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-accent-promo-pink rounded-2xl flex items-center justify-center mb-3">
                    <div className="text-accent-error font-heavy text-xl">%</div>
                  </div>
                  <h4 className="font-bold text-body-md mb-1">도매가 쇼핑</h4>
                  <p className="text-text-tertiary text-[11px] leading-tight">배송비까지 아끼는<br />1/N 가격</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: PREVIEW */}
          {step === 'preview' && product && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 flex-1"
            >
              <div className="flex items-center gap-2 mb-2">
                <button onClick={() => setStep('home')} className="p-2 -ml-2 text-text-secondary hover:text-text-primary transition-colors">
                  <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-heavy">딜 설정하기</h2>
              </div>

              <ProductPreviewCard product={product} targetCount={targetCount} />

              <div className="bg-surface p-6 rounded-2xl border border-border-light shadow-sm">
                <DealOptionForm value={targetCount} onChange={setTargetCount} />
              </div>

              <div className="p-4 bg-accent-promo-green/20 border border-accent-promo-green/30 rounded-2xl flex gap-3 items-center">
                <div className="w-8 h-8 bg-accent-promo-green rounded-lg flex items-center justify-center flex-shrink-0">
                  <Flame className="text-accent-success" size={18} />
                </div>
                <p className="text-caption text-text-secondary font-medium leading-normal">
                  현재 역삼동에 <strong>12명</strong>의 이웃이 대기 중입니다!<br />방을 열면 빠르게 매칭될 거예요.
                </p>
              </div>

              <button
                onClick={handleStartDeal}
                className="w-full h-16 bg-secondary text-text-inverse rounded-2xl font-heavy text-lg shadow-xl shadow-secondary/30 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                N-BOX 방 열기
              </button>
            </motion.div>
          )}

          {/* STEP 3: MATCHING */}
          {step === 'matching' && activeDeal && (
            <motion.div
              key="matching"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8 flex-1 flex flex-col items-center pt-8"
            >
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-heavy text-text-primary animate-pulse">이웃 찾는 중...</h2>
                <p className="text-text-secondary text-body-md font-medium">
                  주변 이웃들에게 알림을 보냈습니다.
                </p>
              </div>

              <div className="flex-1 w-full flex flex-col justify-center py-8">
                <RadarScanner
                  participants={activeDeal.participants}
                  targetCount={activeDeal.targetCount}
                />
                <div className="mt-8">
                  <NeighborList
                    participants={activeDeal.participants}
                    targetCount={activeDeal.targetCount}
                  />
                </div>
              </div>

              {/* Product Info Small Card */}
              <div className="w-full bg-surface/50 backdrop-blur-sm rounded-2xl border border-border-light p-4 flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center overflow-hidden border border-border-light p-1">
                  <img src={activeDeal.product.imageUrl} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="px-1.5 py-0.5 bg-input-bg text-text-tertiary text-[9px] font-heavy rounded tracking-tighter uppercase">
                      {activeDeal.product.category}
                    </span>
                  </div>
                  <p className="text-body-md font-bold text-text-primary truncate">{activeDeal.product.name}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: PAYMENT (Locked -> Processing -> Success Modal) */}
          {step === 'payment' && activeDeal && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6 flex-1 pt-4"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-heavy">매칭 성공!</h2>
                <p className="text-text-secondary font-medium">이제 결제 수단을 등록해주세요.</p>
              </div>

              <PaymentCard
                onRegister={registerCard}
                isLocked={true}
              />

              <div className="bg-surface p-6 rounded-2xl border border-border-light shadow-sm">
                <h3 className="font-bold mb-4">참여 현황</h3>
                <NeighborList
                  participants={activeDeal.participants}
                  targetCount={activeDeal.targetCount}
                />
              </div>

              <ReceiptModal
                deal={activeDeal}
                isOpen={activeDeal.status === 'completed'}
                onClose={handleRestart}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav rounded-t-3xl shadow-floating bg-white/90 backdrop-blur-lg">
        <button
          onClick={() => { if (step !== 'matching' && step !== 'payment') { handleRestart() } }}
          className={cn("flex flex-col items-center gap-1 transition-colors", step === 'home' ? "text-primary scale-110" : "text-text-tertiary")}
        >
          <ShoppingCart size={22} className={step === 'home' ? "fill-primary/10" : ""} />
          <span className="text-[10px] font-heavy">홈</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-text-tertiary hover:text-text-secondary transition-all">
          <Flame size={22} />
          <span className="text-[10px] font-heavy">핫딜</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-text-tertiary hover:text-text-secondary transition-all">
          <MapPin size={22} />
          <span className="text-[10px] font-heavy">주변</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-text-tertiary hover:text-text-secondary transition-all">
          <User size={22} />
          <span className="text-[10px] font-heavy">내 정보</span>
        </button>
      </nav>
    </div>
  )
}

export default App
