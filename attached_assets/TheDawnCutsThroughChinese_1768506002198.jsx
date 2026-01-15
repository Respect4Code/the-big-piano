export default function TheDawnCutsThroughChinese() {
  return (
    <div className="relative min-h-screen bg-black">
      
      {/* Not a gradient. A SHARP line where dawn begins. */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            to top,
            transparent 0%,
            transparent 65%,
            rgba(251, 191, 36, 0.03) 65.5%,
            rgba(251, 191, 36, 0.07) 66%,
            rgba(251, 191, 36, 0.12) 66.5%,
            transparent 67%
          )`
        }}
      />

      <div className="relative max-w-3xl mx-auto px-6 py-32 md:py-40">
        
        {/* Title that feels etched */}
        <div className="text-center mb-28 md:mb-36">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-amber-100 tracking-tighter mb-6">
            破晓
          </h2>
          <div className="h-0.5 w-24 mx-auto bg-gradient-to-r from-amber-800/0 via-amber-600/50 to-amber-800/0 mb-8"></div>
          <p className="text-xl text-stone-400 font-light">
            他们建造新世界如此真实<br />
            旧世界便自行消散
          </p>
        </div>

        {/* Mozart: One sentence. Pure. */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-amber-600/60"></div>
            <span className="text-amber-500/70 text-sm tracking-[0.3em]">莫扎特</span>
          </div>
          <p className="text-2xl md:text-3xl font-serif text-amber-100 leading-tight">
            他没有请求一架更好的钢琴
          </p>
          <p className="text-2xl md:text-3xl font-serif text-amber-100/80 leading-tight mt-2">
            他谱写了<span className="italic">需要它的声音</span>
          </p>
        </div>

        {/* Beethoven: One sentence. Defiant. */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-rose-600/60"></div>
            <span className="text-rose-500/70 text-sm tracking-[0.3em]">贝多芬</span>
          </div>
          <p className="text-2xl md:text-3xl font-serif text-rose-100 leading-tight">
            他没有与寂静抗争
          </p>
          <p className="text-2xl md:text-3xl font-serif text-rose-100/80 leading-tight mt-2">
            他在其中建造了<span className="italic">一座圣殿</span>
          </p>
        </div>

        {/* Satoshi: The centerpiece. Not an explanation. The artifact itself. */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-cyan-600/60"></div>
            <span className="text-cyan-500/70 text-sm tracking-[0.3em]">中本聪</span>
          </div>
          <p className="text-2xl md:text-3xl font-serif text-cyan-100 leading-tight mb-8">
            他们没有抗议救市
          </p>
          
          {/* The Genesis Block - CARVED, not displayed */}
          <div className="relative my-12">
            <div className="absolute -inset-8 bg-gradient-to-r from-cyan-950/0 via-cyan-950/20 to-cyan-950/0"></div>
            <div className="relative">
              <div className="border-l-2 border-cyan-800/50 pl-6 py-1 mb-2">
                <p className="text-cyan-800/40 text-xs font-mono uppercase tracking-[0.3em]">
                  区块 #0 · 创世
                </p>
              </div>
              <div className="bg-black/80 border border-cyan-800/30 rounded p-8 md:p-10 backdrop-blur-sm">
                <p className="font-mono text-cyan-300 text-xl md:text-2xl leading-relaxed tracking-wide">
                  "The Times 03/Jan/2009<br />
                  Chancellor on brink of second bailout for banks"
                </p>
                <p className="font-serif text-cyan-400/70 text-lg mt-4">
                  「泰晤士报 2009年1月3日<br />
                  财政大臣即将对银行进行第二次救助」
                </p>
                <div className="h-px w-full bg-gradient-to-r from-cyan-900/0 via-cyan-800/50 to-cyan-900/0 my-6"></div>
                <p className="text-cyan-700/60 text-xs font-mono uppercase tracking-widest">
                  COINBASE 参数 · 永久不可更改
                </p>
              </div>
            </div>
          </div>

          <p className="text-2xl md:text-3xl font-serif text-cyan-100/80 leading-tight">
            他们建造了<span className="italic">令旧账本过时的新账本</span>
          </p>
        </div>

        {/* The Insight: CRYSTALLIZED */}
        <div className="max-w-2xl mx-auto text-center mb-24">
          <div className="h-px w-32 mx-auto bg-gradient-to-r from-amber-800/0 via-amber-600/50 to-amber-800/0 mb-12"></div>
          
          <p className="text-3xl md:text-4xl font-serif text-amber-100 leading-tight mb-8">
            这一刀非暴力
          </p>
          <p className="text-4xl md:text-5xl font-serif text-amber-50 font-light leading-tight mb-12">
            它是<span className="italic">此在</span>与<span className="italic">可能</span>的分界线
          </p>
          
          <div className="h-px w-24 mx-auto bg-gradient-to-r from-amber-800/0 via-amber-600/30 to-amber-800/0"></div>
        </div>

        {/* The Final Line: THE DAWN */}
        <div className="text-center">
          <p 
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tighter leading-none"
            style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f472b6 50%, #22d3ee 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            黎明<br />
            不是进攻
          </p>
          <p 
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-light tracking-tighter leading-none mt-4"
            style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f472b6 50%, #22d3ee 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            它只是<br />
            到来
          </p>
        </div>

      </div>
    </div>
  );
}
