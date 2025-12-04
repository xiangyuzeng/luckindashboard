import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell, ComposedChart, Area, ScatterChart, Scatter } from 'recharts';

// ===== 数据 =====
const overallRetention = [
  { week: 'W0', rate: 100.0 },
  { week: 'W1', rate: 28.11 },
  { week: 'W2', rate: 24.38 },
  { week: 'W3', rate: 22.48 },
  { week: 'W4', rate: 20.48 },
  { week: 'W5', rate: 19.09 },
  { week: 'W6', rate: 17.80 },
  { week: 'W7', rate: 16.38 },
  { week: 'W8', rate: 14.84 },
  { week: 'W9', rate: 13.10 },
  { week: 'W10', rate: 11.30 },
  { week: 'W11', rate: 8.54 },
  { week: 'W12', rate: 5.02 }
];

const productComparison = [
  { product: "Iced Matcha Coconut", w4: 28.91, w12: 7.18, users: 13600, short: "Iced Matcha Coco" },
  { product: "Iced Americano", w4: 26.53, w12: 9.85, users: 14256, short: "Iced Americano" },
  { product: "Iced Latte", w4: 25.57, w12: 6.06, users: 49956, short: "Iced Latte" },
  { product: "Iced Coconut Velvet", w4: 25.13, w12: 4.76, users: 19665, short: "Iced Coco Velvet" },
  { product: "Cold Brew", w4: 24.52, w12: 4.29, users: 37111, short: "Cold Brew" },
  { product: "Iced Velvet Latte", w4: 24.59, w12: 4.28, users: 66664, short: "Iced Velvet" },
  { product: "Pineapple Cold Brew", w4: 22.74, w12: 6.10, users: 24233, short: "Pineapple CB" },
  { product: "Iced Coconut Latte", w4: 21.58, w12: 4.05, users: 197065, short: "Iced Coconut" },
  { product: "Velvet Latte", w4: 21.45, w12: 3.23, users: 13545, short: "Velvet Latte" },
  { product: "Drip Coffee", w4: 19.24, w12: 7.14, users: 14170, short: "Drip Coffee" },
  { product: "Kyoto Matcha Latte", w4: 15.40, w12: 6.35, users: 15080, short: "Kyoto Matcha" },
  { product: "Iced Caramel Popcorn", w4: 11.77, w12: 0, users: 18350, short: "Iced Caramel" }
];

const heatmapData = [
  { product: "Iced Americano", W0: 100, W1: 35.33, W2: 30.87, W3: 30.03, W4: 26.53, W5: 25.29, W6: 22.77, W7: 21.19, W8: 20.38, W9: 18.56, W10: 15.96, W11: 12.75, W12: 9.85 },
  { product: "Iced Latte", W0: 100, W1: 33.94, W2: 29.67, W3: 27.62, W4: 25.57, W5: 24.05, W6: 21.15, W7: 19.23, W8: 17.02, W9: 14.72, W10: 12.16, W11: 9.62, W12: 6.06 },
  { product: "Iced Matcha Coconut", W0: 100, W1: 34.26, W2: 32.74, W3: 31.03, W4: 28.91, W5: 28.17, W6: 27.63, W7: 24.64, W8: 21.84, W9: 20.18, W10: 15.84, W11: 10.34, W12: 7.18 },
  { product: "Iced Velvet Latte", W0: 100, W1: 33.16, W2: 29.00, W3: 26.82, W4: 24.59, W5: 22.47, W6: 20.92, W7: 18.53, W8: 16.91, W9: 14.14, W10: 11.49, W11: 8.27, W12: 4.28 },
  { product: "Cold Brew", W0: 100, W1: 33.93, W2: 29.87, W3: 27.61, W4: 24.52, W5: 22.98, W6: 20.98, W7: 19.55, W8: 17.00, W9: 14.81, W10: 12.03, W11: 9.00, W12: 4.29 },
  { product: "Iced Coconut Velvet", W0: 100, W1: 33.40, W2: 28.75, W3: 27.64, W4: 25.13, W5: 24.00, W6: 21.25, W7: 19.06, W8: 17.26, W9: 15.39, W10: 12.71, W11: 10.45, W12: 4.76 },
  { product: "Pineapple Cold Brew", W0: 100, W1: 30.71, W2: 27.15, W3: 24.89, W4: 22.74, W5: 20.86, W6: 20.41, W7: 17.54, W8: 15.40, W9: 13.41, W10: 11.10, W11: 8.05, W12: 6.10 },
  { product: "Iced Coconut Latte", W0: 100, W1: 29.74, W2: 25.71, W3: 23.48, W4: 21.58, W5: 19.70, W6: 18.60, W7: 17.31, W8: 15.28, W9: 12.84, W10: 11.27, W11: 8.02, W12: 4.05 },
  { product: "Kyoto Matcha Latte", W0: 100, W1: 22.15, W2: 18.94, W3: 18.32, W4: 15.40, W5: 15.16, W6: 13.76, W7: 13.49, W8: 12.20, W9: 11.92, W10: 11.11, W11: 6.63, W12: 6.35 },
  { product: "Iced Pumpkin Latte", W0: 100, W1: 21.72, W2: 17.80, W3: 15.35, W4: 13.30, W5: 11.36, W6: 10.53, W7: 8.98, W8: 6.46, W9: 5.27, W10: 3.61, W11: 2.78, W12: 0 },
  { product: "Iced Caramel Popcorn", W0: 100, W1: 21.05, W2: 16.11, W3: 13.85, W4: 11.77, W5: 9.17, W6: 6.69, W7: 5.52, W8: 3.45, W9: 2.48, W10: 0, W11: 0, W12: 0 }
];

const cohortData = [
  { cohort: "2025-10-06", W0: 100, W1: 29.0, W2: 26.0, W3: 25.0, W4: 22.0, W5: 23.0, W6: 16.0, W7: 7.0 },
  { cohort: "2025-10-13", W0: 100, W1: 29.25, W2: 26.41, W3: 25.58, W4: 21.81, W5: 22.67, W6: 15.73, W7: 7.04 },
  { cohort: "2025-10-20", W0: 100, W1: 31.17, W2: 29.21, W3: 25.20, W4: 25.24, W5: 17.39, W6: 8.18 },
  { cohort: "2025-10-27", W0: 100, W1: 32.87, W2: 27.78, W3: 27.91, W4: 18.95, W5: 8.75 },
  { cohort: "2025-11-03", W0: 100, W1: 29.87, W2: 27.76, W3: 19.72, W4: 8.73 },
  { cohort: "2025-11-10", W0: 100, W1: 31.10, W2: 20.50, W3: 10.14 }
];

const cupsTrend = [
  { week: 'W0', cups: 1.65 },
  { week: 'W1', cups: 2.20 },
  { week: 'W2', cups: 2.19 },
  { week: 'W3', cups: 2.17 },
  { week: 'W4', cups: 2.17 },
  { week: 'W5', cups: 2.16 },
  { week: 'W6', cups: 2.15 },
  { week: 'W7', cups: 2.12 },
  { week: 'W8', cups: 2.13 },
  { week: 'W9', cups: 2.11 },
  { week: 'W10', cups: 2.13 },
  { week: 'W11', cups: 2.12 },
  { week: 'W12', cups: 1.35 }
];

const conversionMatrix = [
  { from: "Iced Coconut Latte", self: 8.82, toMatcha: 2.08, toLatte: 1.58, toVelvet: 1.58, toFood: 1.75, churn: 67.96 },
  { from: "Iced Kyoto Matcha", self: 10.34, toCoconut: 1.42, toLatte: 1.22, toVelvet: 1.12, toFood: 1.22, churn: 64.96 },
  { from: "Iced Velvet Latte", self: 10.27, toCoconut: 2.66, toLatte: 3.04, toMatcha: 1.71, toFood: 2.47, churn: 58.51 },
  { from: "Iced Latte", self: 16.98, toCoconut: 2.61, toVelvet: 2.80, toMatcha: 1.68, toFood: 6.34, churn: 55.94 },
  { from: "Cold Brew", self: 18.64, toCoconut: 1.76, toLatte: 1.76, toVelvet: 2.27, toFood: 5.79, churn: 56.04 },
  { from: "Sausage Croissant", self: 17.27, toCoconut: 3.64, toLatte: 6.82, toVelvet: 3.18, toColdBrew: 4.09, churn: 45.00 }
];

const flowData = [
  { source: "Iced Coconut Latte", retained: 18.4, toOther: 13.6, churned: 68.0 },
  { source: "Iced Kyoto Matcha", retained: 18.8, toOther: 16.3, churned: 64.9 },
  { source: "Iced Velvet Latte", retained: 20.7, toOther: 20.8, churned: 58.5 },
  { source: "Iced Latte", retained: 25.4, toOther: 18.7, churned: 55.9 },
  { source: "Cold Brew", retained: 30.2, toOther: 13.7, churned: 56.0 },
  { source: "Sausage Croissant", retained: 17.3, toOther: 37.7, churned: 45.0 }
];

// ===== 颜色函数 =====
const getHeatColor = (value) => {
  if (value >= 80) return '#0066CC';
  if (value >= 50) return '#3385D6';
  if (value >= 30) return '#66A3E0';
  if (value >= 20) return '#99C2EB';
  if (value >= 10) return '#CCE0F5';
  if (value >= 5) return '#E6F0FA';
  return '#F5F9FD';
};

// ===== 组件 =====
export default function App() {
  const [activeTab, setActiveTab] = useState('retention');

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #16213e 100%)',
      color: '#fff',
      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '30px',
        padding: '30px',
        background: 'linear-gradient(135deg, rgba(0,102,204,0.2) 0%, rgba(0,160,220,0.1) 100%)',
        borderRadius: '20px',
        border: '1px solid rgba(0,102,204,0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '10px' }}>
          <div style={{
            width: '50px',
            height: '50px',
            background: 'linear-gradient(135deg, #0066CC 0%, #00A0DC 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}>☕</div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            background: 'linear-gradient(90deg, #0066CC, #00CED1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0
          }}>瑞幸咖啡 美国市场用户分析</h1>
        </div>
        <p style={{ color: '#8892b0', fontSize: '16px', margin: 0 }}>
          Luckin Coffee US Market · User Retention & Category Conversion Analysis
        </p>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        {[
          { id: 'retention', label: '📊 品牌留存分析', en: 'Retention' },
          { id: 'product', label: '🏆 产品对比', en: 'Products' },
          { id: 'cohort', label: '👥 队列分析', en: 'Cohort' },
          { id: 'conversion', label: '🔄 品类转化', en: 'Conversion' },
          { id: 'flow', label: '🌊 用户流向', en: 'User Flow' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              background: activeTab === tab.id 
                ? 'linear-gradient(135deg, #0066CC 0%, #00A0DC 100%)'
                : 'rgba(255,255,255,0.05)',
              color: activeTab === tab.id ? '#fff' : '#8892b0',
              boxShadow: activeTab === tab.id ? '0 4px 20px rgba(0,102,204,0.4)' : 'none'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* 留存分析 */}
        {activeTab === 'retention' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* 整体留存曲线 */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#00CED1' }}>
                📉 整体留存曲线 (W0-W12)
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={overallRetention}>
                  <defs>
                    <linearGradient id="retentionGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0066CC" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#0066CC" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="week" stroke="#8892b0" fontSize={12} />
                  <YAxis stroke="#8892b0" fontSize={12} domain={[0, 100]} tickFormatter={v => `${v}%`} />
                  <Tooltip 
                    contentStyle={{ background: '#1a1a2e', border: '1px solid #0066CC', borderRadius: '8px' }}
                    formatter={(value) => [`${value}%`, '留存率']}
                  />
                  <Area type="monotone" dataKey="rate" fill="url(#retentionGradient)" stroke="none" />
                  <Line type="monotone" dataKey="rate" stroke="#0066CC" strokeWidth={3} dot={{ fill: '#0066CC', r: 5 }} />
                </ComposedChart>
              </ResponsiveContainer>
              <div style={{ 
                marginTop: '15px', 
                padding: '12px', 
                background: 'rgba(0,102,204,0.1)', 
                borderRadius: '8px',
                fontSize: '13px',
                color: '#8892b0'
              }}>
                💡 <strong style={{color: '#00CED1'}}>关键发现:</strong> W1流失率高达71.9%，是最大流失节点。W4留存约20%，W12仅剩5%。
              </div>
            </div>

            {/* 人均杯数趋势 */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#00CED1' }}>
                ☕ 留存用户人均消费杯数
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={cupsTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="week" stroke="#8892b0" fontSize={12} />
                  <YAxis stroke="#8892b0" fontSize={12} domain={[0, 3]} />
                  <Tooltip 
                    contentStyle={{ background: '#1a1a2e', border: '1px solid #00A0DC', borderRadius: '8px' }}
                    formatter={(value) => [`${value} 杯`, '人均']}
                  />
                  <Bar dataKey="cups" radius={[4, 4, 0, 0]}>
                    {cupsTrend.map((entry, index) => (
                      <Cell key={index} fill={index === 0 ? '#FF6B35' : '#00A0DC'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div style={{ 
                marginTop: '15px', 
                padding: '12px', 
                background: 'rgba(0,160,220,0.1)', 
                borderRadius: '8px',
                fontSize: '13px',
                color: '#8892b0'
              }}>
                💡 <strong style={{color: '#00CED1'}}>洞察:</strong> 留存用户消费频次稳定在2.1-2.2杯/周，说明核心用户粘性较好。
              </div>
            </div>

            {/* 产品留存热力图 */}
            <div style={{
              gridColumn: '1 / -1',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#00CED1' }}>
                🔥 产品留存率热力图 (%)
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '10px', textAlign: 'left', color: '#8892b0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>产品</th>
                      {['W0', 'W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'].map(w => (
                        <th key={w} style={{ padding: '10px', textAlign: 'center', color: '#8892b0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{w}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {heatmapData.map((row, i) => (
                      <tr key={i}>
                        <td style={{ padding: '8px', color: '#fff', fontWeight: '500', whiteSpace: 'nowrap' }}>{row.product}</td>
                        {['W0', 'W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'].map(w => (
                          <td key={w} style={{ 
                            padding: '8px', 
                            textAlign: 'center',
                            background: getHeatColor(row[w] || 0),
                            color: (row[w] || 0) > 30 ? '#fff' : '#1a1a2e',
                            fontWeight: '600',
                            borderRadius: '4px'
                          }}>
                            {row[w] || '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ 
                marginTop: '15px', 
                padding: '12px', 
                background: 'rgba(0,102,204,0.1)', 
                borderRadius: '8px',
                fontSize: '13px',
                color: '#8892b0',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                flexWrap: 'wrap'
              }}>
                <span>颜色图例:</span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  {[
                    { color: '#0066CC', label: '≥80%' },
                    { color: '#66A3E0', label: '30-50%' },
                    { color: '#99C2EB', label: '20-30%' },
                    { color: '#CCE0F5', label: '10-20%' },
                    { color: '#F5F9FD', label: '<5%' }
                  ].map(item => (
                    <span key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '16px', height: '16px', background: item.color, borderRadius: '3px' }}></span>
                      <span style={{ fontSize: '11px' }}>{item.label}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 产品对比 */}
        {activeTab === 'product' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#00CED1' }}>
                🏆 产品留存能力对比 (W4 vs W12)
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={productComparison} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis type="number" stroke="#8892b0" fontSize={12} domain={[0, 35]} tickFormatter={v => `${v}%`} />
                  <YAxis dataKey="short" type="category" stroke="#8892b0" fontSize={11} width={120} />
                  <Tooltip 
                    contentStyle={{ background: '#1a1a2e', border: '1px solid #0066CC', borderRadius: '8px' }}
                    formatter={(value, name) => [`${value}%`, name === 'w4' ? 'W4留存' : 'W12留存']}
                  />
                  <Legend />
                  <Bar dataKey="w4" name="W4留存率 (1个月)" fill="#0066CC" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="w12" name="W12留存率 (3个月)" fill="#00CED1" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div style={{ 
                marginTop: '15px', 
                padding: '12px', 
                background: 'rgba(0,102,204,0.1)', 
                borderRadius: '8px',
                fontSize: '13px',
                color: '#8892b0'
              }}>
                💡 <strong style={{color: '#00CED1'}}>高质量入口产品:</strong> Iced Americano和Cold Brew的长期留存最佳。Iced Matcha Coconut Latte表现突出。
                <br/>⚠️ <strong style={{color: '#F39C12'}}>需关注:</strong> Iced Caramel Popcorn Latte虽首购量大，但W12留存为0，是典型的"尝鲜型"产品。
              </div>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#00CED1' }}>
                📈 产品矩阵: 用户规模 vs 留存质量
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="users" 
                    name="用户数" 
                    stroke="#8892b0" 
                    fontSize={12}
                    tickFormatter={v => `${(v/1000).toFixed(0)}K`}
                  />
                  <YAxis 
                    dataKey="w4" 
                    name="W4留存" 
                    stroke="#8892b0" 
                    fontSize={12}
                    tickFormatter={v => `${v}%`}
                  />
                  <Tooltip 
                    contentStyle={{ background: '#1a1a2e', border: '1px solid #0066CC', borderRadius: '8px' }}
                    formatter={(value, name) => {
                      if (name === '用户数') return [`${(value/1000).toFixed(1)}K`, name];
                      return [`${value}%`, name];
                    }}
                  />
                  <Scatter name="产品" data={productComparison} fill="#0066CC">
                    {productComparison.map((entry, index) => (
                      <Cell key={index} fill={entry.w4 > 22 ? '#2ECC71' : entry.w4 > 18 ? '#F39C12' : '#E74C3C'} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '30px', 
                marginTop: '15px',
                fontSize: '12px'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '12px', height: '12px', background: '#2ECC71', borderRadius: '50%' }}></span>
                  高留存 (&gt;22%)
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '12px', height: '12px', background: '#F39C12', borderRadius: '50%' }}></span>
                  中留存 (18-22%)
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '12px', height: '12px', background: '#E74C3C', borderRadius: '50%' }}></span>
                  低留存 (&lt;18%)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 队列分析 */}
        {activeTab === 'cohort' && (
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid rgba(255,255,255,0.08)'
          }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#00CED1' }}>
              👥 队列留存分析 (按入口周分组)
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="week" 
                  stroke="#8892b0" 
                  fontSize={12}
                  allowDuplicatedCategory={false}
                />
                <YAxis stroke="#8892b0" fontSize={12} domain={[0, 100]} tickFormatter={v => `${v}%`} />
                <Tooltip 
                  contentStyle={{ background: '#1a1a2e', border: '1px solid #0066CC', borderRadius: '8px' }}
                  formatter={(value) => [`${value}%`, '留存率']}
                />
                <Legend />
                {cohortData.map((cohort, idx) => {
                  const lineData = Object.keys(cohort)
                    .filter(k => k.startsWith('W'))
                    .map(k => ({ week: k, rate: cohort[k] }));
                  const colors = ['#0066CC', '#00A0DC', '#00CED1', '#48D1CC', '#40E0D0', '#20B2AA'];
                  return (
                    <Line 
                      key={cohort.cohort}
                      data={lineData}
                      dataKey="rate"
                      name={cohort.cohort}
                      stroke={colors[idx % colors.length]}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
            <div style={{ 
              marginTop: '15px', 
              padding: '12px', 
              background: 'rgba(0,102,204,0.1)', 
              borderRadius: '8px',
              fontSize: '13px',
              color: '#8892b0'
            }}>
              💡 <strong style={{color: '#00CED1'}}>趋势观察:</strong> 各队列留存曲线形态相似，W1-W2是关键流失期。较新队列(11月)的早期留存略有下降趋势，需持续观察。
            </div>
          </div>
        )}

        {/* 品类转化 */}
        {activeTab === 'conversion' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#00CED1' }}>
                🔄 品类转化率矩阵 (1-7天内)
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '12px', textAlign: 'left', color: '#00CED1', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>首购产品 →</th>
                      <th style={{ padding: '12px', textAlign: 'center', color: '#8892b0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>同品复购</th>
                      <th style={{ padding: '12px', textAlign: 'center', color: '#8892b0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>→ Coconut</th>
                      <th style={{ padding: '12px', textAlign: 'center', color: '#8892b0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>→ Matcha</th>
                      <th style={{ padding: '12px', textAlign: 'center', color: '#8892b0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>→ Latte</th>
                      <th style={{ padding: '12px', textAlign: 'center', color: '#8892b0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>→ 食品</th>
                      <th style={{ padding: '12px', textAlign: 'center', color: '#E74C3C', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>流失率</th>
                    </tr>
                  </thead>
                  <tbody>
                    {conversionMatrix.map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                        <td style={{ padding: '12px', color: '#fff', fontWeight: '500' }}>{row.from}</td>
                        <td style={{ padding: '12px', textAlign: 'center', background: getHeatColor(row.self * 3), color: row.self > 15 ? '#fff' : '#1a1a2e', fontWeight: '600', borderRadius: '4px' }}>
                          {row.self}%
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center', color: '#00CED1' }}>{row.toCoconut || row.toMatcha || '-'}%</td>
                        <td style={{ padding: '12px', textAlign: 'center', color: '#00CED1' }}>{row.toMatcha || row.toCoconut || '-'}%</td>
                        <td style={{ padding: '12px', textAlign: 'center', color: '#00CED1' }}>{row.toLatte || row.toVelvet || '-'}%</td>
                        <td style={{ padding: '12px', textAlign: 'center', color: '#F39C12' }}>{row.toFood}%</td>
                        <td style={{ padding: '12px', textAlign: 'center', color: '#E74C3C', fontWeight: '600' }}>{row.churn}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ 
                marginTop: '15px', 
                padding: '12px', 
                background: 'rgba(0,102,204,0.1)', 
                borderRadius: '8px',
                fontSize: '13px',
                color: '#8892b0'
              }}>
                💡 <strong style={{color: '#00CED1'}}>转化洞察:</strong> 
                <br/>• Cold Brew和Iced Latte同品复购率最高(18-25%)，用户粘性强
                <br/>• Sausage Croissant作为食品入口，能有效引导用户尝试饮品(37.7%跨品类)
                <br/>• 各品类流失率在55-68%，需加强首周复购激励
              </div>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#00CED1' }}>
                📊 首购产品转化流向分布
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={flowData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis type="number" stroke="#8892b0" fontSize={12} domain={[0, 100]} tickFormatter={v => `${v}%`} />
                  <YAxis dataKey="source" type="category" stroke="#8892b0" fontSize={11} width={130} />
                  <Tooltip 
                    contentStyle={{ background: '#1a1a2e', border: '1px solid #0066CC', borderRadius: '8px' }}
                    formatter={(value) => [`${value}%`]}
                  />
                  <Legend />
                  <Bar dataKey="retained" name="同品复购" stackId="a" fill="#2ECC71" />
                  <Bar dataKey="toOther" name="跨品类转化" stackId="a" fill="#F39C12" />
                  <Bar dataKey="churned" name="流失" stackId="a" fill="#E74C3C" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 用户流向 Mind Map */}
        {activeTab === 'flow' && (
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid rgba(255,255,255,0.08)'
          }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#00CED1' }}>
              🌊 用户周度流向分析 (Mind Map)
            </h3>
            
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '30px',
              padding: '20px'
            }}>
              {/* Week 0 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{
                  padding: '15px 25px',
                  background: 'linear-gradient(135deg, #0066CC 0%, #00A0DC 100%)',
                  borderRadius: '12px',
                  fontWeight: '600',
                  minWidth: '120px',
                  textAlign: 'center',
                  boxShadow: '0 4px 15px rgba(0,102,204,0.4)'
                }}>
                  Week 0<br/>
                  <span style={{ fontSize: '24px' }}>100%</span>
                </div>
                <div style={{ fontSize: '24px', color: '#00CED1' }}>→</div>
                <div style={{ flex: 1, display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {[
                    { name: 'Iced Coconut Latte', pct: '23%', users: '197K' },
                    { name: 'Iced Kyoto Matcha', pct: '12%', users: '100K' },
                    { name: 'Iced Velvet Latte', pct: '8%', users: '67K' },
                    { name: 'Iced Latte', pct: '6%', users: '50K' },
                    { name: 'Others', pct: '51%', users: '430K' }
                  ].map(p => (
                    <div key={p.name} style={{
                      padding: '10px 15px',
                      background: 'rgba(0,206,209,0.15)',
                      borderRadius: '8px',
                      border: '1px solid rgba(0,206,209,0.3)',
                      fontSize: '12px'
                    }}>
                      <div style={{ color: '#00CED1', fontWeight: '600' }}>{p.name}</div>
                      <div style={{ color: '#8892b0' }}>{p.pct} ({p.users})</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Week 1 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginLeft: '60px', flexWrap: 'wrap' }}>
                <div style={{
                  padding: '12px 20px',
                  background: 'linear-gradient(135deg, #00A0DC 0%, #00CED1 100%)',
                  borderRadius: '10px',
                  fontWeight: '600',
                  minWidth: '100px',
                  textAlign: 'center'
                }}>
                  Week 1<br/>
                  <span style={{ fontSize: '20px' }}>28.1%</span>
                </div>
                <div style={{ fontSize: '20px', color: '#00CED1' }}>→</div>
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                  <div style={{
                    padding: '12px 20px',
                    background: 'rgba(46,204,113,0.2)',
                    borderRadius: '8px',
                    border: '1px solid rgba(46,204,113,0.4)'
                  }}>
                    <div style={{ color: '#2ECC71', fontWeight: '600' }}>✓ 留存用户</div>
                    <div style={{ fontSize: '20px', color: '#fff' }}>28.1%</div>
                  </div>
                  <div style={{
                    padding: '12px 20px',
                    background: 'rgba(231,76,60,0.2)',
                    borderRadius: '8px',
                    border: '1px solid rgba(231,76,60,0.4)'
                  }}>
                    <div style={{ color: '#E74C3C', fontWeight: '600' }}>✗ 流失用户</div>
                    <div style={{ fontSize: '20px', color: '#fff' }}>71.9%</div>
                  </div>
                </div>
              </div>

              {/* Week 4 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginLeft: '120px', flexWrap: 'wrap' }}>
                <div style={{
                  padding: '10px 18px',
                  background: 'linear-gradient(135deg, #00CED1 0%, #48D1CC 100%)',
                  borderRadius: '8px',
                  fontWeight: '600',
                  minWidth: '90px',
                  textAlign: 'center'
                }}>
                  Week 4<br/>
                  <span style={{ fontSize: '18px' }}>20.5%</span>
                </div>
                <div style={{ fontSize: '18px', color: '#48D1CC' }}>→</div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {[
                    { label: '同品复购', pct: '12%', color: '#2ECC71' },
                    { label: '跨品类', pct: '8.5%', color: '#F39C12' },
                    { label: '本周流失', pct: '7.6%', color: '#E74C3C' }
                  ].map(item => (
                    <div key={item.label} style={{
                      padding: '8px 12px',
                      background: `${item.color}20`,
                      borderRadius: '6px',
                      border: `1px solid ${item.color}40`,
                      fontSize: '12px'
                    }}>
                      <div style={{ color: item.color }}>{item.label}</div>
                      <div style={{ color: '#fff', fontWeight: '600' }}>{item.pct}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Week 8 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginLeft: '180px', flexWrap: 'wrap' }}>
                <div style={{
                  padding: '8px 15px',
                  background: 'linear-gradient(135deg, #48D1CC 0%, #40E0D0 100%)',
                  borderRadius: '6px',
                  fontWeight: '600',
                  minWidth: '80px',
                  textAlign: 'center'
                }}>
                  Week 8<br/>
                  <span style={{ fontSize: '16px' }}>14.8%</span>
                </div>
                <div style={{ fontSize: '16px', color: '#40E0D0' }}>→</div>
                <div style={{
                  padding: '10px 15px',
                  background: 'rgba(64,224,208,0.15)',
                  borderRadius: '6px',
                  border: '1px solid rgba(64,224,208,0.3)',
                  fontSize: '12px'
                }}>
                  <span style={{ color: '#40E0D0' }}>核心忠诚用户群</span>
                  <br/>
                  <span style={{ color: '#8892b0' }}>人均消费 2.13 杯/周</span>
                </div>
              </div>

              {/* Week 12 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginLeft: '240px', flexWrap: 'wrap' }}>
                <div style={{
                  padding: '8px 12px',
                  background: 'linear-gradient(135deg, #40E0D0 0%, #20B2AA 100%)',
                  borderRadius: '6px',
                  fontWeight: '600',
                  minWidth: '70px',
                  textAlign: 'center',
                  fontSize: '14px'
                }}>
                  Week 12<br/>
                  <span style={{ fontSize: '14px' }}>5.0%</span>
                </div>
                <div style={{ fontSize: '14px', color: '#20B2AA' }}>→</div>
                <div style={{
                  padding: '8px 12px',
                  background: 'rgba(32,178,170,0.15)',
                  borderRadius: '6px',
                  border: '1px solid rgba(32,178,170,0.3)',
                  fontSize: '11px',
                  color: '#20B2AA'
                }}>
                  长期留存用户 (3个月+)
                </div>
              </div>
            </div>

            {/* 关键指标总结 */}
            <div style={{
              marginTop: '30px',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '15px'
            }}>
              {[
                { label: 'W1关键流失率', value: '71.9%', color: '#E74C3C', icon: '⚠️' },
                { label: 'W4月留存', value: '20.5%', color: '#F39C12', icon: '📊' },
                { label: 'W12季度留存', value: '5.0%', color: '#00CED1', icon: '📈' },
                { label: '核心用户人均杯数', value: '2.15杯/周', color: '#2ECC71', icon: '☕' }
              ].map(stat => (
                <div key={stat.label} style={{
                  padding: '20px',
                  background: `${stat.color}15`,
                  borderRadius: '12px',
                  border: `1px solid ${stat.color}30`,
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.icon}</div>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: '12px', color: '#8892b0', marginTop: '5px' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* 策略建议 */}
            <div style={{
              marginTop: '25px',
              padding: '20px',
              background: 'rgba(0,102,204,0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(0,102,204,0.2)'
            }}>
              <h4 style={{ margin: '0 0 15px 0', color: '#00CED1' }}>💡 策略建议</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '13px', color: '#8892b0' }}>
                <div>
                  <strong style={{ color: '#2ECC71' }}>提升W1留存:</strong>
                  <br/>• 首购后24/48小时推送复购优惠
                  <br/>• 建立7天内二次消费激励机制
                </div>
                <div>
                  <strong style={{ color: '#F39C12' }}>优化产品组合:</strong>
                  <br/>• 推广高留存产品(Iced Americano, Cold Brew)
                  <br/>• 利用食品(Sausage Croissant)引流饮品
                </div>
                <div>
                  <strong style={{ color: '#00A0DC' }}>跨品类引导:</strong>
                  <br/>• 基于首购产品推荐相似品类
                  <br/>• 季节性产品向经典款转化
                </div>
                <div>
                  <strong style={{ color: '#E74C3C' }}>流失预警:</strong>
                  <br/>• 监控W2-W3未复购用户
                  <br/>• 针对性发送召回优惠券
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        marginTop: '40px',
        padding: '20px',
        color: '#8892b0',
        fontSize: '12px'
      }}>
        数据周期: 2025年9月 - 12月 | 8家门店汇总 | 71个SKU
      </div>
    </div>
  );
}
