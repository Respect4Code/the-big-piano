/**
 * 钢琴-区块链时间线组件（中文版）
 * Piano-Blockchain Timeline Component (Chinese)
 * 
 * 色彩隐喻 / Color Metaphor:
 * - stone 色系 = 钢琴木质的温暖感（橡木、胡桃木、桃花心木外壳）
 * - amber 色系 = 陈年象牙琴键、黄铜配件、作曲的黄金时代
 * - 渐变 = 从羽管键琴的轻盈到现代钢琴的厚重之演进
 * 
 * 生产环境建议：考虑在 Tailwind 配置中扩展语义化颜色：
 * piano: { 800: '#292524', 900: '#1c1917' }
 * ivory: { 300: '#fef3c7' }
 * ebony: { 900: '#0c0a09' }
 */

export default function PianoBlockchainTimeline() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 to-stone-800 p-8">
      {/* stone-900 至 stone-800 = 陈年钢琴木纹 */}
      <div className="max-w-3xl mx-auto">
        
        {/* 核心洞见标题 */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-amber-400 mb-3">
            什么是钢琴？
          </h2>
          <p className="text-stone-300 italic text-lg max-w-xl mx-auto">
            正如中本聪利用区块链质疑"什么是货币？"，
            莫扎特和贝多芬通过质疑"什么是钢琴？"去中心化了声音。
          </p>
        </div>

        {/* 类比图解 */}
        {/* amber-600/30 边框 = 钢琴黄铜铰链与踏板配件 */}
        <div className="bg-stone-800/50 rounded-lg p-4 mb-8 border border-amber-600/30">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-stone-400">
              <span className="text-amber-400 font-semibold">区块链</span> = 音乐创新网络
            </div>
            <div className="text-stone-400">
              <span className="text-amber-400 font-semibold">作曲家</span> = 矿工（验证新声音）
            </div>
            <div className="text-stone-400">
              <span className="text-amber-400 font-semibold">乐谱</span> = 代码（BTC 白皮书）
            </div>
            <div className="text-stone-400">
              <span className="text-amber-400 font-semibold">纸张</span> = 互联网（去中心化的思想）
            </div>
          </div>
        </div>

        {/* 时间线 */}
        <div className="relative">
          {/* 垂直线 - amber 渐变 = 钢琴黄金时代的演进 */}
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 via-amber-600 to-amber-800"></div>
          
          {/* 1770年代 - 莫扎特：创世区块 */}
          <div className="relative mb-10 pl-16">
            {/* amber-400 = 最明亮的象牙色，最早的创新 */}
            <div className="absolute left-4 w-5 h-5 bg-amber-400 rounded-full border-4 border-stone-900"></div>
            <div className="bg-stone-800 rounded-lg p-5 border border-stone-700">
              <div className="flex justify-between items-start mb-3">
                <span className="bg-amber-600 text-white px-3 py-1 rounded text-sm font-bold">1770年代</span>
                <span className="text-stone-500 text-xs italic">创世区块</span>
              </div>
              
              {/* 双向关系 */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="text-right">
                  <div className="text-amber-300 font-bold">莫扎特</div>
                  <div className="text-stone-500 text-xs">作曲家</div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-amber-400">→</span>
                  <span className="text-xs text-stone-500">推动</span>
                  <span className="text-amber-400">←</span>
                  <span className="text-xs text-stone-500">赋能</span>
                </div>
                <div className="text-left">
                  <div className="text-amber-300 font-bold">施坦因 / 沃尔特</div>
                  <div className="text-stone-500 text-xs">制造商</div>
                </div>
              </div>
              
              <p className="text-stone-300 text-sm mb-3">
                质疑强弱琴的局限。将音域扩展到5-6个八度。
                为<em>尚不存在</em>的乐器作曲——迫使制造商迎头赶上。
              </p>
              
              <div className="bg-stone-900/50 rounded p-3 text-xs">
                <span className="text-amber-400 font-semibold">区块链类比：</span>
                <span className="text-stone-400">如同中本聪为一个将超越自身发展的系统编写规则</span>
              </div>
            </div>
          </div>

          {/* 1810年代 - 贝多芬：硬分叉 */}
          <div className="relative mb-10 pl-16">
            {/* amber-500 = 略深的色调，更重琴弦的时代 */}
            <div className="absolute left-4 w-5 h-5 bg-amber-500 rounded-full border-4 border-stone-900"></div>
            <div className="bg-stone-800 rounded-lg p-5 border border-stone-700">
              <div className="flex justify-between items-start mb-3">
                <span className="bg-amber-600 text-white px-3 py-1 rounded text-sm font-bold">1810年代</span>
                <span className="text-stone-500 text-xs italic">硬分叉</span>
              </div>
              
              {/* 双向关系 */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="text-right">
                  <div className="text-amber-300 font-bold">贝多芬</div>
                  <div className="text-stone-500 text-xs">作曲家</div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-amber-400">→</span>
                  <span className="text-xs text-stone-500">弹坏钢琴</span>
                  <span className="text-amber-400">←</span>
                  <span className="text-xs text-stone-500">造得更坚固</span>
                </div>
                <div className="text-left">
                  <div className="text-amber-300 font-bold">布罗德伍德 / 埃拉尔</div>
                  <div className="text-stone-500 text-xs">制造商</div>
                </div>
              </div>
              
              <p className="text-stone-300 text-sm mb-3">
                真的把钢琴弹坏了。要求铸铁框架、更重的琴弦、
                踏板系统。在失聪后编写代码（乐谱）——在无法"听见"的情况下信任系统。
              </p>
              
              <div className="bg-stone-900/50 rounded p-3 text-xs mb-3">
                <span className="text-amber-400 font-semibold">区块链类比：</span>
                <span className="text-stone-400">从莫扎特优雅风格的硬分叉——相同的底层代码，截然不同的执行方式</span>
              </div>
              
              <div className="border-t border-stone-700 pt-3">
                <span className="text-stone-500 text-xs">工作量证明：</span>
                <span className="text-amber-300 text-sm ml-2">《槌子键琴》奏鸣曲</span>
              </div>
            </div>
          </div>

          {/* 1830年代+ - 矿工们 */}
          <div className="relative mb-10 pl-16">
            {/* amber-600 = 成熟的黄金时代，钢琴全面发展 */}
            <div className="absolute left-4 w-5 h-5 bg-amber-600 rounded-full border-4 border-stone-900"></div>
            <div className="bg-stone-800 rounded-lg p-5 border border-stone-700">
              <div className="flex justify-between items-start mb-3">
                <span className="bg-amber-600 text-white px-3 py-1 rounded text-sm font-bold">1830年代+</span>
                <span className="text-stone-500 text-xs italic">矿工们</span>
              </div>
              
              <h4 className="text-amber-300 font-bold text-center mb-4">
                作曲家作为自我调节的验证者
              </h4>
              
              <p className="text-stone-300 text-sm mb-4">
                不再需要信任钢琴制造商——他们用自己的耳朵验证声音。
                这促进了钢琴在家庭中的更广泛采用。
              </p>
              
              {/* 矿工网格 */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-stone-900/50 rounded p-3">
                  <div className="text-amber-300 font-semibold text-sm">肖邦</div>
                  <div className="text-stone-400 text-xs">工作量证明：练习曲</div>
                </div>
                <div className="bg-stone-900/50 rounded p-3">
                  <div className="text-amber-300 font-semibold text-sm">李斯特</div>
                  <div className="text-stone-400 text-xs">工作量证明：《钟》</div>
                </div>
                <div className="bg-stone-900/50 rounded p-3">
                  <div className="text-amber-300 font-semibold text-sm">勃拉姆斯</div>
                  <div className="text-stone-400 text-xs">工作量证明：《间奏曲》</div>
                </div>
                <div className="bg-stone-900/50 rounded p-3">
                  <div className="text-amber-300 font-semibold text-sm">德彪西</div>
                  <div className="text-stone-400 text-xs">工作量证明：《月光》</div>
                </div>
              </div>
              
              <div className="bg-stone-900/50 rounded p-3 text-xs">
                <span className="text-amber-400 font-semibold">区块链类比：</span>
                <span className="text-stone-400">如同 BTC 矿工因保持区块链透明而获得奖励——这些作曲家通过音乐影响力因推动边界而获得"奖励"</span>
              </div>
            </div>
          </div>

          {/* 今天 - 乐谱永存 */}
          <div className="relative pl-16">
            {/* amber-700 = 最深的色调，过去与现在交汇之处 */}
            <div className="absolute left-4 w-5 h-5 bg-amber-700 rounded-full border-4 border-stone-900"></div>
            <div className="bg-stone-800/50 rounded-lg p-5 border border-dashed border-stone-600">
              <div className="flex justify-between items-start mb-3">
                <span className="bg-stone-600 text-white px-3 py-1 rounded text-sm font-bold">今天</span>
                <span className="text-stone-500 text-xs italic">乐谱永存</span>
              </div>
              
              <p className="text-stone-400 text-sm italic">
                正如 BTC 白皮书至今仍在，莫扎特和贝多芬的手写乐谱也依然存在。
                它们就是代码——去中心化、不可阻挡、启发新的分叉。
              </p>
            </div>
          </div>
        </div>

        {/* 页脚洞见 */}
        <div className="mt-10 text-center">
          <p className="text-stone-500 text-sm max-w-lg mx-auto">
            纸张是他们的互联网。工业革命创造了纸张，带来了墨水和铅笔——
            书写成为记录人类思想的去中心化方式，任何人都无法阻止。
          </p>
        </div>
      </div>
    </div>
  );
}
