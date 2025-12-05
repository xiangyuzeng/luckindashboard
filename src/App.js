import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell, ScatterChart, Scatter, ZAxis, ReferenceLine, PieChart, Pie, AreaChart, Area, ComposedChart } from 'recharts';

// ===== 产品留存率热力图数据 (按月份) =====
const productRetentionByMonth = {
  "全部": [
    { product: "Iced Coconut Latte", W0: 100, W1: 29.50, W2: 25.38, W3: 23.45, W4: 21.61, W5: 19.35, W6: 18.05, W7: 16.84, W8: 15.06, W9: 12.61, W10: 11.31, W11: 8.13, W12: 4.03 },
    { product: "Iced Kyoto Matcha Latte", W0: 100, W1: 26.30, W2: 22.37, W3: 20.25, W4: 17.97, W5: 16.15, W6: 14.96, W7: 13.55, W8: 12.26, W9: 10.65, W10: 8.93, W11: 6.37, W12: 4.16 },
    { product: "Iced Velvet Latte", W0: 100, W1: 32.61, W2: 28.34, W3: 26.67, W4: 24.19, W5: 21.72, W6: 19.98, W7: 17.70, W8: 15.97, W9: 13.79, W10: 11.32, W11: 8.27, W12: 4.25 },
    { product: "Iced Matcha Coconut", W0: 100, W1: 26.01, W2: 22.14, W3: 19.90, W4: 17.91, W5: 16.29, W6: 13.78, W7: 12.46, W8: 11.01, W9: 10.06, W10: 9.10, W11: 6.95, W12: 3.35 },
    { product: "Iced Latte", W0: 100, W1: 31.89, W2: 27.91, W3: 26.27, W4: 24.40, W5: 22.72, W6: 19.79, W7: 18.06, W8: 15.97, W9: 14.06, W10: 11.24, W11: 8.98, W12: 5.40 },
    { product: "Cold Brew", W0: 100, W1: 32.74, W2: 29.15, W3: 27.09, W4: 24.25, W5: 22.45, W6: 20.31, W7: 18.88, W8: 16.35, W9: 14.90, W10: 11.71, W11: 9.04, W12: 4.29 },
    { product: "Latte", W0: 100, W1: 24.88, W2: 21.14, W3: 19.81, W4: 17.88, W5: 16.04, W6: 15.35, W7: 13.57, W8: 14.03, W9: 13.09, W10: 11.87, W11: 7.89, W12: 4.69 },
    { product: "Coconut Latte", W0: 100, W1: 24.12, W2: 21.21, W3: 19.54, W4: 16.99, W5: 16.09, W6: 15.86, W7: 14.49, W8: 12.91, W9: 13.18, W10: 10.87, W11: 7.18, W12: 6.15 },
    { product: "Pineapple Cold Brew", W0: 100, W1: 30.21, W2: 27.67, W3: 24.66, W4: 22.93, W5: 21.07, W6: 20.62, W7: 17.45, W8: 15.28, W9: 13.65, W10: 11.66, W11: 9.32, W12: 8.37 },
    { product: "Iced Pumpkin Latte", W0: 100, W1: 21.76, W2: 17.42, W3: 14.77, W4: 12.61, W5: 10.38, W6: 10.04, W7: 8.80, W8: 6.04, W9: 5.43, W10: 3.74, W11: 3.38, W12: null },
    { product: "Iced Caramel Popcorn", W0: 100, W1: 21.11, W2: 15.99, W3: 14.38, W4: 11.74, W5: 9.50, W6: 6.95, W7: 5.74, W8: 3.93, W9: 2.73, W10: null, W11: null, W12: null },
  ],
  "9月": [
    { product: "Iced Coconut Latte", W0: 100, W1: 31.4, W2: 25.4, W3: 22.7, W4: 21.4, W5: 20.5, W6: 20.0, W7: 19.6, W8: 17.2, W9: null, W10: null, W11: null, W12: null },
    { product: "Iced Kyoto Matcha Latte", W0: 100, W1: 26.6, W2: 21.8, W3: 18.5, W4: 17.2, W5: 16.8, W6: 15.9, W7: 15.4, W8: 13.9, W9: null, W10: null, W11: null, W12: null },
    { product: "Iced Velvet Latte", W0: 100, W1: 31.0, W2: 26.4, W3: 24.7, W4: 23.3, W5: 21.5, W6: 21.1, W7: 20.2, W8: 18.4, W9: null, W10: null, W11: null, W12: null },
    { product: "Iced Matcha Coconut", W0: 100, W1: 26.4, W2: 21.6, W3: 19.0, W4: 17.3, W5: 16.5, W6: 14.8, W7: 14.2, W8: 12.6, W9: null, W10: null, W11: null, W12: null },
    { product: "Iced Latte", W0: 100, W1: 30.1, W2: 26.4, W3: 24.7, W4: 24.1, W5: 23.3, W6: 20.8, W7: 19.7, W8: 17.9, W9: null, W10: null, W11: null, W12: null },
    { product: "Cold Brew", W0: 100, W1: 34.3, W2: 29.0, W3: 26.2, W4: 24.3, W5: 23.5, W6: 22.2, W7: 21.7, W8: 19.0, W9: null, W10: null, W11: null, W12: null },
    { product: "Latte", W0: 100, W1: 26.4, W2: 20.8, W3: 19.9, W4: 17.5, W5: 17.5, W6: 17.4, W7: 16.1, W8: 15.7, W9: null, W10: null, W11: null, W12: null },
    { product: "Coconut Latte", W0: 100, W1: 28.6, W2: 25.5, W3: 21.7, W4: 19.6, W5: 18.9, W6: 19.2, W7: 17.0, W8: 14.5, W9: null, W10: null, W11: null, W12: null },
    { product: "Pineapple Cold Brew", W0: 100, W1: 30.5, W2: 28.2, W3: 25.1, W4: 23.8, W5: 22.0, W6: 21.8, W7: 18.5, W8: 16.2, W9: null, W10: null, W11: null, W12: null },
    { product: "Iced Pumpkin Latte", W0: 100, W1: 22.3, W2: 18.0, W3: 15.2, W4: 13.1, W5: 10.8, W6: 10.5, W7: 9.2, W8: 6.4, W9: null, W10: null, W11: null, W12: null },
  ],
  "10月": [
    { product: "Iced Coconut Latte", W0: 100, W1: 33.0, W2: 29.8, W3: 28.5, W4: 25.0, W5: 18.2, W6: 15.5, W7: 11.4, W8: 6.7, W9: null, W10: null, W11: null, W12: null },
    { product: "Iced Kyoto Matcha Latte", W0: 100, W1: 30.5, W2: 26.6, W3: 24.9, W4: 21.5, W5: 15.5, W6: 13.8, W7: 9.9, W8: 5.7, W9: null, W10: null, W11: null, W12: null },
    { product: "Iced Velvet Latte", W0: 100, W1: 37.2, W2: 34.2, W3: 32.1, W4: 28.4, W5: 22.0, W6: 18.5, W7: 12.7, W8: 6.4, W9: null, W10: null, W11: null, W12: null },
    { product: "Iced Matcha Coconut", W0: 100, W1: 30.1, W2: 26.2, W3: 24.1, W4: 21.3, W5: 16.1, W6: 12.4, W7: 8.9, W8: 4.6, W9: null, W10: null, W11: null, W12: null },
    { product: "Iced Latte", W0: 100, W1: 38.2, W2: 34.0, W3: 31.7, W4: 28.1, W5: 22.1, W6: 18.4, W7: 14.8, W8: 8.2, W9: null, W10: null, W11: null, W12: null },
    { product: "Cold Brew", W0: 100, W1: 36.9, W2: 34.3, W3: 33.2, W4: 28.6, W5: 21.3, W6: 17.8, W7: 13.3, W8: 5.9, W9: null, W10: null, W11: null, W12: null },
    { product: "Latte", W0: 100, W1: 27.2, W2: 25.1, W3: 22.1, W4: 20.3, W5: 14.6, W6: 12.6, W7: 8.5, W8: 5.6, W9: null, W10: null, W11: null, W12: null },
    { product: "Coconut Latte", W0: 100, W1: 26.3, W2: 22.8, W3: 21.2, W4: 16.5, W5: 13.2, W6: 11.4, W7: 9.4, W8: 6.5, W9: null, W10: null, W11: null, W12: null },
    { product: "Caramel Popcorn Latte", W0: 100, W1: 24.5, W2: 18.5, W3: 16.2, W4: 13.5, W5: 10.8, W6: 8.2, W7: 6.5, W8: 4.2, W9: null, W10: null, W11: null, W12: null },
    { product: "Iced Pumpkin Latte", W0: 100, W1: 23.8, W2: 19.2, W3: 16.5, W4: 14.2, W5: 11.5, W6: 10.8, W7: 9.5, W8: 6.8, W9: null, W10: null, W11: null, W12: null },
  ],
  "11月": [
    { product: "Iced Coconut Latte", W0: 100, W1: 24.6, W2: 19.8, W3: 14.9, W4: 8.8, W5: null, W6: null, W7: null, W8: null, W9: null, W10: null, W11: null, W12: null },
    { product: "Iced Kyoto Matcha Latte", W0: 100, W1: 22.2, W2: 17.7, W3: 14.4, W4: 7.1, W5: null, W6: null, W7: null, W8: null, W9: null, W10: null, W11: null, W12: null },
    { product: "Iced Velvet Latte", W0: 100, W1: 29.9, W2: 23.5, W3: 19.7, W4: 10.9, W5: null, W6: null, W7: null, W8: null, W9: null, W10: null, W11: null, W12: null },
    { product: "Iced Matcha Coconut", W0: 100, W1: 21.9, W2: 17.5, W3: 13.4, W4: 6.5, W5: null, W6: null, W7: null, W8: null, W9: null, W10: null, W11: null, W12: null },
    { product: "Iced Latte", W0: 100, W1: 27.8, W2: 22.2, W3: 18.4, W4: 10.5, W5: null, W6: null, W7: null, W8: null, W9: null, W10: null, W11: null, W12: null },
    { product: "Cold Brew", W0: 100, W1: 27.6, W2: 22.9, W3: 16.8, W4: 6.4, W5: null, W6: null, W7: null, W8: null, W9: null, W10: null, W11: null, W12: null },
    { product: "Latte", W0: 100, W1: 21.4, W2: 16.6, W3: 15.1, W4: 7.9, W5: null, W6: null, W7: null, W8: null, W9: null, W10: null, W11: null, W12: null },
    { product: "Coconut Latte", W0: 100, W1: 18.0, W2: 13.8, W3: 11.8, W4: 8.2, W5: null, W6: null, W7: null, W8: null, W9: null, W10: null, W11: null, W12: null },
    { product: "Toffee Hazelnut Latte", W0: 100, W1: 19.5, W2: 15.2, W3: 12.8, W4: 7.5, W5: null, W6: null, W7: null, W8: null, W9: null, W10: null, W11: null, W12: null },
    { product: "Baked Pudding Latte", W0: 100, W1: 20.8, W2: 16.5, W3: 13.9, W4: 8.2, W5: null, W6: null, W7: null, W8: null, W9: null, W10: null, W11: null, W12: null },
  ]
};

// ===== 品类偏好转移数据 (按月份) =====
const categoryTransferByMonth = {
  "全部": [
    { category: "抹茶系列", users: 34.68, retention: 42, 抹茶系列: 14, 生椰系列: 5, 经典咖啡: 5, 冷萃: 4, 轻食: 4, 丝绒系列: 2, 果蔬瓶: 2, 瑞纳冰: 2, 生咖: 1, 季节产品: 2, 非咖啡: 0, 套餐: 0 },
    { category: "生椰系列", users: 32.44, retention: 43, 抹茶系列: 6, 生椰系列: 13, 经典咖啡: 6, 冷萃: 4, 轻食: 4, 丝绒系列: 3, 果蔬瓶: 2, 瑞纳冰: 1, 生咖: 1, 季节产品: 3, 非咖啡: 0, 套餐: 0 },
    { category: "经典咖啡", users: 31.40, retention: 51, 抹茶系列: 5, 生椰系列: 4, 经典咖啡: 23, 冷萃: 5, 轻食: 6, 丝绒系列: 3, 果蔬瓶: 2, 瑞纳冰: 1, 生咖: 1, 季节产品: 2, 非咖啡: 0, 套餐: 0 },
    { category: "冷萃", users: 21.07, retention: 54, 抹茶系列: 5, 生椰系列: 5, 经典咖啡: 7, 冷萃: 19, 轻食: 6, 丝绒系列: 2, 果蔬瓶: 3, 瑞纳冰: 2, 生咖: 2, 季节产品: 2, 非咖啡: 0, 套餐: 0 },
    { category: "轻食", users: 16.65, retention: 63, 抹茶系列: 6, 生椰系列: 6, 经典咖啡: 11, 冷萃: 7, 轻食: 16, 丝绒系列: 4, 果蔬瓶: 3, 瑞纳冰: 2, 生咖: 3, 季节产品: 3, 非咖啡: 1, 套餐: 0 },
    { category: "丝绒系列", users: 13.68, retention: 48, 抹茶系列: 5, 生椰系列: 6, 经典咖啡: 7, 冷萃: 4, 轻食: 5, 丝绒系列: 12, 果蔬瓶: 2, 瑞纳冰: 1, 生咖: 1, 季节产品: 3, 非咖啡: 0, 套餐: 0 },
    { category: "果蔬瓶", users: 10.84, retention: 53, 抹茶系列: 7, 生椰系列: 5, 经典咖啡: 7, 冷萃: 6, 轻食: 6, 丝绒系列: 2, 果蔬瓶: 10, 瑞纳冰: 3, 生咖: 3, 季节产品: 2, 非咖啡: 1, 套餐: 0 },
    { category: "瑞纳冰", users: 9.43, retention: 46, 抹茶系列: 5, 生椰系列: 4, 经典咖啡: 4, 冷萃: 3, 轻食: 5, 丝绒系列: 2, 果蔬瓶: 4, 瑞纳冰: 11, 生咖: 4, 季节产品: 3, 非咖啡: 1, 套餐: 0 },
    { category: "生咖", users: 7.39, retention: 47, 抹茶系列: 6, 生椰系列: 5, 经典咖啡: 5, 冷萃: 5, 轻食: 7, 丝绒系列: 2, 果蔬瓶: 4, 瑞纳冰: 4, 生咖: 9, 季节产品: 2, 非咖啡: 1, 套餐: 0 },
    { category: "季节产品", users: 8.74, retention: 37, 抹茶系列: 5, 生椰系列: 5, 经典咖啡: 6, 冷萃: 4, 轻食: 4, 丝绒系列: 3, 果蔬瓶: 2, 瑞纳冰: 2, 生咖: 1, 季节产品: 4, 非咖啡: 0, 套餐: 0 },
    { category: "非咖啡", users: 1.45, retention: 60, 抹茶系列: 7, 生椰系列: 5, 经典咖啡: 8, 冷萃: 7, 轻食: 9, 丝绒系列: 3, 果蔬瓶: 3, 瑞纳冰: 5, 生咖: 4, 季节产品: 2, 非咖啡: 8, 套餐: 0 },
    { category: "套餐", users: 0.40, retention: 72, 抹茶系列: 13, 生椰系列: 13, 经典咖啡: 10, 冷萃: 11, 轻食: 5, 丝绒系列: 5, 果蔬瓶: 5, 瑞纳冰: 4, 生咖: 2, 季节产品: 6, 非咖啡: 0, 套餐: 0 },
  ],
  "9月": [
    { category: "抹茶系列", users: 30.76, retention: 44, 抹茶系列: 15, 生椰系列: 5, 经典咖啡: 5, 冷萃: 4, 轻食: 4, 丝绒系列: 3, 果蔬瓶: 2, 瑞纳冰: 2, 生咖: 2, 季节产品: 2, 非咖啡: 0, 套餐: 0 },
    { category: "生椰系列", users: 29.07, retention: 45, 抹茶系列: 6, 生椰系列: 14, 经典咖啡: 6, 冷萃: 4, 轻食: 4, 丝绒系列: 3, 果蔬瓶: 2, 瑞纳冰: 1, 生咖: 1, 季节产品: 3, 非咖啡: 0, 套餐: 0 },
    { category: "经典咖啡", users: 27.29, retention: 54, 抹茶系列: 5, 生椰系列: 4, 经典咖啡: 24, 冷萃: 5, 轻食: 6, 丝绒系列: 3, 果蔬瓶: 2, 瑞纳冰: 1, 生咖: 1, 季节产品: 2, 非咖啡: 0, 套餐: 0 },
    { category: "冷萃", users: 19.03, retention: 57, 抹茶系列: 5, 生椰系列: 5, 经典咖啡: 8, 冷萃: 21, 轻食: 7, 丝绒系列: 2, 果蔬瓶: 3, 瑞纳冰: 2, 生咖: 2, 季节产品: 2, 非咖啡: 0, 套餐: 0 },
    { category: "轻食", users: 14.82, retention: 67, 抹茶系列: 7, 生椰系列: 6, 经典咖啡: 12, 冷萃: 8, 轻食: 17, 丝绒系列: 4, 果蔬瓶: 3, 瑞纳冰: 2, 生咖: 3, 季节产品: 3, 非咖啡: 1, 套餐: 0 },
    { category: "丝绒系列", users: 12.24, retention: 51, 抹茶系列: 6, 生椰系列: 7, 经典咖啡: 8, 冷萃: 4, 轻食: 5, 丝绒系列: 13, 果蔬瓶: 2, 瑞纳冰: 1, 生咖: 1, 季节产品: 3, 非咖啡: 0, 套餐: 0 },
    { category: "果蔬瓶", users: 10.05, retention: 55, 抹茶系列: 7, 生椰系列: 6, 经典咖啡: 7, 冷萃: 6, 轻食: 6, 丝绒系列: 2, 果蔬瓶: 11, 瑞纳冰: 3, 生咖: 3, 季节产品: 2, 非咖啡: 1, 套餐: 0 },
    { category: "瑞纳冰", users: 8.55, retention: 49, 抹茶系列: 6, 生椰系列: 4, 经典咖啡: 4, 冷萃: 4, 轻食: 5, 丝绒系列: 2, 果蔬瓶: 4, 瑞纳冰: 12, 生咖: 4, 季节产品: 3, 非咖啡: 1, 套餐: 0 },
    { category: "生咖", users: 6.72, retention: 50, 抹茶系列: 6, 生椰系列: 5, 经典咖啡: 5, 冷萃: 5, 轻食: 7, 丝绒系列: 2, 果蔬瓶: 4, 瑞纳冰: 4, 生咖: 10, 季节产品: 2, 非咖啡: 1, 套餐: 0 },
    { category: "季节产品", users: 7.47, retention: 41, 抹茶系列: 6, 生椰系列: 6, 经典咖啡: 7, 冷萃: 4, 轻食: 4, 丝绒系列: 4, 果蔬瓶: 2, 瑞纳冰: 2, 生咖: 1, 季节产品: 5, 非咖啡: 0, 套餐: 0 },
    { category: "非咖啡", users: 1.28, retention: 63, 抹茶系列: 8, 生椰系列: 5, 经典咖啡: 8, 冷萃: 7, 轻食: 9, 丝绒系列: 3, 果蔬瓶: 3, 瑞纳冰: 5, 生咖: 4, 季节产品: 2, 非咖啡: 9, 套餐: 0 },
    { category: "套餐", users: 0.40, retention: 80, 抹茶系列: 14, 生椰系列: 14, 经典咖啡: 10, 冷萃: 11, 轻食: 5, 丝绒系列: 5, 果蔬瓶: 6, 瑞纳冰: 5, 生咖: 3, 季节产品: 7, 非咖啡: 0, 套餐: 0 },
  ],
  "10月": [
    { category: "抹茶系列", users: 3.92, retention: 14, 抹茶系列: 5, 生椰系列: 1, 经典咖啡: 2, 冷萃: 1, 轻食: 2, 丝绒系列: 1, 果蔬瓶: 0, 瑞纳冰: 1, 生咖: 1, 季节产品: 1, 非咖啡: 0, 套餐: 0 },
    { category: "生椰系列", users: 3.37, retention: 15, 抹茶系列: 2, 生椰系列: 5, 经典咖啡: 2, 冷萃: 1, 轻食: 2, 丝绒系列: 1, 果蔬瓶: 1, 瑞纳冰: 0, 生咖: 0, 季节产品: 1, 非咖啡: 0, 套餐: 0 },
    { category: "经典咖啡", users: 4.11, retention: 20, 抹茶系列: 1, 生椰系列: 1, 经典咖啡: 11, 冷萃: 1, 轻食: 3, 丝绒系列: 1, 果蔬瓶: 0, 瑞纳冰: 0, 生咖: 0, 季节产品: 0, 非咖啡: 0, 套餐: 0 },
    { category: "冷萃", users: 2.04, retention: 21, 抹茶系列: 1, 生椰系列: 2, 经典咖啡: 3, 冷萃: 9, 轻食: 3, 丝绒系列: 1, 果蔬瓶: 1, 瑞纳冰: 0, 生咖: 1, 季节产品: 1, 非咖啡: 0, 套餐: 0 },
    { category: "轻食", users: 1.83, retention: 31, 抹茶系列: 3, 生椰系列: 3, 经典咖啡: 6, 冷萃: 3, 轻食: 9, 丝绒系列: 2, 果蔬瓶: 1, 瑞纳冰: 1, 生咖: 2, 季节产品: 1, 非咖啡: 0, 套餐: 0 },
    { category: "丝绒系列", users: 1.44, retention: 17, 抹茶系列: 1, 生椰系列: 2, 经典咖啡: 3, 冷萃: 1, 轻食: 2, 丝绒系列: 5, 果蔬瓶: 0, 瑞纳冰: 0, 生咖: 1, 季节产品: 1, 非咖啡: 0, 套餐: 0 },
    { category: "果蔬瓶", users: 0.79, retention: 26, 抹茶系列: 4, 生椰系列: 3, 经典咖啡: 3, 冷萃: 2, 轻食: 4, 丝绒系列: 1, 果蔬瓶: 7, 瑞纳冰: 1, 生咖: 1, 季节产品: 1, 非咖啡: 0, 套餐: 0 },
    { category: "瑞纳冰", users: 0.88, retention: 17, 抹茶系列: 2, 生椰系列: 2, 经典咖啡: 1, 冷萃: 1, 轻食: 2, 丝绒系列: 1, 果蔬瓶: 1, 瑞纳冰: 4, 生咖: 1, 季节产品: 1, 非咖啡: 0, 套餐: 0 },
    { category: "生咖", users: 0.67, retention: 27, 抹茶系列: 3, 生椰系列: 3, 经典咖啡: 2, 冷萃: 4, 轻食: 5, 丝绒系列: 2, 果蔬瓶: 2, 瑞纳冰: 1, 生咖: 4, 季节产品: 1, 非咖啡: 0, 套餐: 0 },
    { category: "季节产品", users: 1.27, retention: 13, 抹茶系列: 2, 生椰系列: 2, 经典咖啡: 2, 冷萃: 1, 轻食: 2, 丝绒系列: 1, 果蔬瓶: 1, 瑞纳冰: 0, 生咖: 1, 季节产品: 1, 非咖啡: 0, 套餐: 0 },
    { category: "非咖啡", users: 0.17, retention: 25, 抹茶系列: 2, 生椰系列: 1, 经典咖啡: 3, 冷萃: 4, 轻食: 4, 丝绒系列: 1, 果蔬瓶: 1, 瑞纳冰: 2, 生咖: 2, 季节产品: 1, 非咖啡: 5, 套餐: 0 },
    { category: "套餐", users: 0.00, retention: 0, 抹茶系列: 0, 生椰系列: 0, 经典咖啡: 0, 冷萃: 0, 轻食: 0, 丝绒系列: 0, 果蔬瓶: 0, 瑞纳冰: 0, 生咖: 0, 季节产品: 0, 非咖啡: 0, 套餐: 0 },
  ],
};

// ===== 首购产品转化流向数据 (按月份) =====
const conversionFlowByMonth = {
  "全部": [
    { source: "Iced Coconut Latte", 同品复购: 10.8, 跨品类转化: 18.9, 流失: 70.3 },
    { source: "Iced Kyoto Matcha", 同品复购: 10.3, 跨品类转化: 16.0, 流失: 73.7 },
    { source: "Iced Velvet Latte", 同品复购: 10.3, 跨品类转化: 20.6, 流失: 69.1 },
    { source: "Iced Latte", 同品复购: 17.0, 跨品类转化: 20.1, 流失: 62.9 },
    { source: "Cold Brew", 同品复购: 18.6, 跨品类转化: 17.5, 流失: 63.9 },
    { source: "Sausage Croissant", 同品复购: 17.3, 跨品类转化: 37.7, 流失: 45.0 },
    { source: "Iced Americano", 同品复购: 23.4, 跨品类转化: 18.5, 流失: 58.1 },
    { source: "Latte", 同品复购: 13.1, 跨品类转化: 19.2, 流失: 67.7 },
  ],
  "9月": [
    { source: "Iced Coconut Latte", 同品复购: 12.5, 跨品类转化: 20.8, 流失: 66.7 },
    { source: "Iced Kyoto Matcha", 同品复购: 12.0, 跨品类转化: 18.5, 流失: 69.5 },
    { source: "Iced Velvet Latte", 同品复购: 12.8, 跨品类转化: 22.5, 流失: 64.7 },
    { source: "Iced Latte", 同品复购: 19.5, 跨品类转化: 22.3, 流失: 58.2 },
    { source: "Cold Brew", 同品复购: 21.2, 跨品类转化: 19.8, 流失: 59.0 },
    { source: "Sausage Croissant", 同品复购: 19.5, 跨品类转化: 40.2, 流失: 40.3 },
    { source: "Iced Americano", 同品复购: 25.8, 跨品类转化: 20.2, 流失: 54.0 },
    { source: "Latte", 同品复购: 15.2, 跨品类转化: 21.5, 流失: 63.3 },
  ],
  "10月": [
    { source: "Iced Coconut Latte", 同品复购: 8.2, 跨品类转化: 15.3, 流失: 76.5 },
    { source: "Iced Kyoto Matcha", 同品复购: 7.5, 跨品类转化: 12.8, 流失: 79.7 },
    { source: "Iced Velvet Latte", 同品复购: 7.2, 跨品类转化: 16.5, 流失: 76.3 },
    { source: "Iced Latte", 同品复购: 13.5, 跨品类转化: 16.8, 流失: 69.7 },
    { source: "Cold Brew", 同品复购: 14.8, 跨品类转化: 14.2, 流失: 71.0 },
    { source: "Sausage Croissant", 同品复购: 14.2, 跨品类转化: 32.5, 流失: 53.3 },
    { source: "Iced Americano", 同品复购: 19.5, 跨品类转化: 15.8, 流失: 64.7 },
    { source: "Caramel Popcorn Latte", 同品复购: 5.8, 跨品类转化: 12.5, 流失: 81.7 },
  ],
  "11月": [
    { source: "Iced Coconut Latte", 同品复购: 6.5, 跨品类转化: 12.8, 流失: 80.7 },
    { source: "Iced Kyoto Matcha", 同品复购: 5.8, 跨品类转化: 10.5, 流失: 83.7 },
    { source: "Iced Velvet Latte", 同品复购: 6.2, 跨品类转化: 14.2, 流失: 79.6 },
    { source: "Iced Latte", 同品复购: 10.8, 跨品类转化: 14.5, 流失: 74.7 },
    { source: "Cold Brew", 同品复购: 11.5, 跨品类转化: 12.8, 流失: 75.7 },
    { source: "Toffee Hazelnut Latte", 同品复购: 8.2, 跨品类转化: 10.5, 流失: 81.3 },
    { source: "Baked Pudding Latte", 同品复购: 9.5, 跨品类转化: 11.8, 流失: 78.7 },
    { source: "Spanish Latte", 同品复购: 7.8, 跨品类转化: 15.2, 流失: 77.0 },
  ],
};

// ===== 产品矩阵数据 (按月份) =====
const productMatrixByMonth = {
  "全部": [
    { name: "生椰拿铁", dailySales: 392.2, repurchaseRate: 10.8, category: "特色奶咖", users: 52827 },
    { name: "京都抹茶拿铁", dailySales: 189.0, repurchaseRate: 10.3, category: "抹茶", users: 26110 },
    { name: "拿铁", dailySales: 209.2, repurchaseRate: 17.0, category: "基础奶咖", users: 29642 },
    { name: "丝绒拿铁", dailySales: 149.8, repurchaseRate: 10.3, category: "特色奶咖", users: 20970 },
    { name: "冷萃", dailySales: 93.7, repurchaseRate: 18.6, category: "基础黑咖", users: 12693 },
    { name: "美式", dailySales: 72.7, repurchaseRate: 23.4, category: "基础黑咖", users: 9857 },
    { name: "滴滤", dailySales: 41.0, repurchaseRate: 18.5, category: "基础黑咖", users: 5510 },
    { name: "芝士蛋堡可颂", dailySales: 89.2, repurchaseRate: 17.3, category: "食品", users: 11959 },
    { name: "南瓜肉桂拿铁", dailySales: 59.1, repurchaseRate: 5.2, category: "LTO", users: 8265 },
    { name: "爆米花拿铁", dailySales: 71.3, repurchaseRate: 5.8, category: "LTO", users: 9623 },
    { name: "卡布奇诺", dailySales: 48.7, repurchaseRate: 9.7, category: "基础奶咖", users: 6809 },
    { name: "轻体超模瓶", dailySales: 47.0, repurchaseRate: 11.0, category: "超模瓶", users: 6522 },
    { name: "京都抹茶生椰拿铁", dailySales: 102.3, repurchaseRate: 9.5, category: "抹茶", users: 13873 },
    { name: "菠萝冷萃", dailySales: 55.4, repurchaseRate: 9.7, category: "特色黑咖", users: 8024 },
    { name: "杨枝甘露", dailySales: 35.7, repurchaseRate: 8.5, category: "瑞纳冰", users: 5172 },
  ],
  "9月": [
    { name: "生椰拿铁", dailySales: 496.6, repurchaseRate: 12.5, category: "特色奶咖", users: 14899 },
    { name: "京都抹茶拿铁", dailySales: 328.2, repurchaseRate: 12.0, category: "抹茶", users: 9846 },
    { name: "拿铁", dailySales: 266.5, repurchaseRate: 19.5, category: "基础奶咖", users: 7995 },
    { name: "京都抹茶生椰拿铁", dailySales: 218.1, repurchaseRate: 10.8, category: "抹茶", users: 6543 },
    { name: "丝绒拿铁", dailySales: 215.1, repurchaseRate: 12.8, category: "特色奶咖", users: 6453 },
    { name: "冷萃", dailySales: 140.5, repurchaseRate: 21.2, category: "基础黑咖", users: 4215 },
    { name: "芝士蛋堡可颂", dailySales: 113.0, repurchaseRate: 19.5, category: "食品", users: 3390 },
    { name: "南瓜肉桂拿铁", dailySales: 88.7, repurchaseRate: 6.5, category: "LTO", users: 2661 },
    { name: "美式", dailySales: 84.7, repurchaseRate: 25.8, category: "基础黑咖", users: 2541 },
    { name: "菠萝冷萃", dailySales: 67.7, repurchaseRate: 11.2, category: "特色黑咖", users: 2031 },
    { name: "轻体超模瓶", dailySales: 63.7, repurchaseRate: 12.5, category: "超模瓶", users: 1911 },
    { name: "卡布奇诺", dailySales: 56.2, repurchaseRate: 11.5, category: "基础奶咖", users: 1686 },
    { name: "生椰丝绒拿铁", dailySales: 55.8, repurchaseRate: 11.8, category: "特色奶咖", users: 1674 },
    { name: "京都抹茶瑞纳冰", dailySales: 49.9, repurchaseRate: 9.8, category: "瑞纳冰", users: 1497 },
    { name: "芒椰日出生咖", dailySales: 46.4, repurchaseRate: 10.2, category: "生咖", users: 1392 },
  ],
  "10月": [
    { name: "生椰拿铁", dailySales: 401.1, repurchaseRate: 8.2, category: "特色奶咖", users: 12434 },
    { name: "京都抹茶拿铁", dailySales: 313.0, repurchaseRate: 7.5, category: "抹茶", users: 9703 },
    { name: "拿铁", dailySales: 276.9, repurchaseRate: 13.5, category: "基础奶咖", users: 8584 },
    { name: "爆米花拿铁", dailySales: 234.9, repurchaseRate: 5.8, category: "LTO", users: 7282 },
    { name: "丝绒拿铁", dailySales: 175.2, repurchaseRate: 7.2, category: "特色奶咖", users: 5431 },
    { name: "南瓜肉桂拿铁", dailySales: 145.5, repurchaseRate: 4.8, category: "LTO", users: 4511 },
    { name: "京都抹茶生椰拿铁", dailySales: 142.0, repurchaseRate: 7.0, category: "抹茶", users: 4402 },
    { name: "芝士蛋堡可颂", dailySales: 126.7, repurchaseRate: 14.2, category: "食品", users: 3928 },
    { name: "冷萃", dailySales: 104.9, repurchaseRate: 14.8, category: "基础黑咖", users: 3252 },
    { name: "美式", dailySales: 101.2, repurchaseRate: 19.5, category: "基础黑咖", users: 3137 },
    { name: "滴滤", dailySales: 70.7, repurchaseRate: 15.2, category: "基础黑咖", users: 2192 },
    { name: "卡布奇诺", dailySales: 68.6, repurchaseRate: 8.5, category: "基础奶咖", users: 2127 },
    { name: "烤奶布丁拿铁", dailySales: 61.6, repurchaseRate: 6.2, category: "LTO", users: 1910 },
    { name: "西班牙拿铁", dailySales: 58.6, repurchaseRate: 7.8, category: "特色奶咖", users: 1817 },
    { name: "生椰丝绒拿铁", dailySales: 40.6, repurchaseRate: 8.5, category: "特色奶咖", users: 1259 },
  ],
  "11月": [
    { name: "生椰拿铁", dailySales: 323.3, repurchaseRate: 6.5, category: "特色奶咖", users: 9699 },
    { name: "京都抹茶拿铁", dailySales: 265.9, repurchaseRate: 5.8, category: "抹茶", users: 7977 },
    { name: "拿铁", dailySales: 246.2, repurchaseRate: 10.8, category: "基础奶咖", users: 7386 },
    { name: "太妃榛果拿铁", dailySales: 177.3, repurchaseRate: 8.2, category: "LTO", users: 5319 },
    { name: "烤奶布丁拿铁", dailySales: 142.9, repurchaseRate: 9.5, category: "LTO", users: 4287 },
    { name: "西班牙拿铁", dailySales: 139.9, repurchaseRate: 7.8, category: "特色奶咖", users: 4197 },
    { name: "丝绒拿铁", dailySales: 128.8, repurchaseRate: 6.2, category: "特色奶咖", users: 3864 },
    { name: "爆米花拿铁", dailySales: 123.2, repurchaseRate: 4.8, category: "LTO", users: 3696 },
    { name: "芝士蛋堡可颂", dailySales: 116.4, repurchaseRate: 12.8, category: "食品", users: 3492 },
    { name: "京都抹茶生椰拿铁", dailySales: 109.4, repurchaseRate: 5.5, category: "抹茶", users: 3282 },
    { name: "美式", dailySales: 100.4, repurchaseRate: 15.2, category: "基础黑咖", users: 3012 },
    { name: "冷萃", dailySales: 85.5, repurchaseRate: 11.5, category: "基础黑咖", users: 2565 },
    { name: "卡布奇诺", dailySales: 68.1, repurchaseRate: 7.2, category: "基础奶咖", users: 2043 },
    { name: "南瓜肉桂拿铁", dailySales: 64.5, repurchaseRate: 3.8, category: "LTO", users: 1935 },
    { name: "滴滤", dailySales: 58.4, repurchaseRate: 12.5, category: "基础黑咖", users: 1752 },
  ],
};

// ===== Mind Map增强数据 =====
const mindmapDataEnhanced = {
  overview: {
    totalUsers: "97万+",
    dataRange: "2025年9月-12月",
    stores: 8,
    skus: 71
  },
  weeklyRetention: [
    { week: "W0", rate: 100, label: "首购", color: "#0066CC" },
    { week: "W1", rate: 28.1, label: "首次复购", color: "#00A0DC" },
    { week: "W2", rate: 24.4, label: "习惯培养", color: "#00B8D4" },
    { week: "W4", rate: 20.5, label: "月度留存", color: "#00CED1" },
    { week: "W8", rate: 14.8, label: "双月留存", color: "#48D1CC" },
    { week: "W12", rate: 5.0, label: "季度留存", color: "#20B2AA" },
  ],
  churnAnalysis: {
    w1Churn: { rate: 71.9, reasons: ["首次体验不满意", "价格敏感", "距离/便利性", "竞品替代"] },
    w4Churn: { rate: 7.6, reasons: ["习惯未养成", "产品厌倦", "生活变化"] },
    w12Churn: { rate: 9.8, reasons: ["长期流失", "搬迁/旅行", "健康原因"] }
  },
  highValueProducts: [
    { name: "Cold Brew", w1Retention: 34.3, avgCups: 2.3, ltv: "高" },
    { name: "Iced Americano", w1Retention: 35.3, avgCups: 2.1, ltv: "高" },
    { name: "Iced Latte", w1Retention: 33.9, avgCups: 2.2, ltv: "高" },
    { name: "Sausage Croissant", w1Retention: 33.2, crossSell: 37.7, ltv: "中高" },
  ],
  lowRetentionProducts: [
    { name: "Iced Caramel Popcorn", w1Retention: 21.1, w4Retention: 11.8, type: "尝鲜型" },
    { name: "Iced Pumpkin Latte", w1Retention: 21.7, w4Retention: 12.6, type: "季节型" },
    { name: "Kyoto Matcha Latte", w1Retention: 22.2, w4Retention: 15.4, type: "特定口味" },
  ],
  conversionPaths: [
    { from: "Iced Coconut", to: "Iced Velvet", rate: 5.2, insight: "口味升级" },
    { from: "Sausage Croissant", to: "Iced Latte", rate: 6.8, insight: "食品引流" },
    { from: "抹茶系列", to: "生椰系列", rate: 5.5, insight: "品类探索" },
    { from: "LTO产品", to: "经典咖啡", rate: 8.2, insight: "新客转化" },
  ],
  monthlyTrends: [
    { month: "9月", newUsers: 167000, retention: 45, avgCups: 2.18 },
    { month: "10月", newUsers: 145000, retention: 42, avgCups: 2.12 },
    { month: "11月", newUsers: 98000, retention: 38, avgCups: 2.05 },
    { month: "12月", newUsers: 32000, retention: 35, avgCups: 1.95 },
  ]
};

// ===== 颜色工具函数 =====
const getHeatColor = (value) => {
  if (value === null || value === undefined) return '#2a2a3e';
  if (value >= 30) return '#0066CC';
  if (value >= 20) return '#3385D6';
  if (value >= 10) return '#66A3E0';
  if (value >= 5) return '#99C2EB';
  return '#CCE0F5';
};

const getTransferHeatColor = (value, isSelf = false) => {
  if (isSelf && value >= 10) return '#E74C3C';
  if (value >= 15) return '#0066CC';
  if (value >= 10) return '#3385D6';
  if (value >= 5) return '#66A3E0';
  if (value >= 2) return '#99C2EB';
  return 'transparent';
};

const getCategoryColor = (category) => {
  const colors = {
    "基础黑咖": "#9B59B6",
    "基础奶咖": "#3498DB",
    "特色奶咖": "#2ECC71",
    "抹茶": "#1ABC9C",
    "特色黑咖": "#8E44AD",
    "超模瓶": "#16A085",
    "生咖": "#E67E22",
    "瑞纳冰": "#5DADE2",
    "食品": "#F39C12",
    "LTO": "#E91E63"
  };
  return colors[category] || "#95A5A6";
};

// ===== 月份筛选组件 =====
const MonthFilter = ({ selectedMonth, onMonthChange, availableMonths }) => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: '8px',
    background: 'rgba(0,0,0,0.2)',
    padding: '8px 12px',
    borderRadius: '8px',
    marginBottom: '15px'
  }}>
    <span style={{ color: '#8892b0', fontSize: '13px' }}>📅 数据筛选:</span>
    {availableMonths.map(month => (
      <button
        key={month}
        onClick={() => onMonthChange(month)}
        style={{
          padding: '6px 14px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: selectedMonth === month ? '600' : '400',
          background: selectedMonth === month ? '#0066CC' : 'rgba(255,255,255,0.08)',
          color: selectedMonth === month ? '#fff' : '#8892b0',
          transition: 'all 0.2s ease'
        }}
      >
        {month}
      </button>
    ))}
  </div>
);

// ===== 主组件 =====
export default function App() {
  const [activeTab, setActiveTab] = useState('retention');
  const [selectedMonth, setSelectedMonth] = useState('全部');

  const availableMonths = ['全部', '9月', '10月', '11月'];
  const categoryList = ['抹茶系列', '生椰系列', '经典咖啡', '冷萃', '轻食', '丝绒系列', '果蔬瓶', '瑞纳冰', '生咖', '季节产品', '非咖啡', '套餐'];

  // 根据月份获取数据
  const currentRetentionData = productRetentionByMonth[selectedMonth] || productRetentionByMonth['全部'];
  const currentTransferData = categoryTransferByMonth[selectedMonth] || categoryTransferByMonth['全部'];
  const currentFlowData = conversionFlowByMonth[selectedMonth] || conversionFlowByMonth['全部'];
  const currentMatrixData = productMatrixByMonth[selectedMonth] || productMatrixByMonth['全部'];

  // 计算平均留存率作为基准
  const avgRetention = useMemo(() => {
    const weeks = ['W0', 'W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'];
    const avg = { product: "📊 平均留存率 (Benchmark)", isAvg: true };
    weeks.forEach(w => {
      const values = currentRetentionData.filter(r => r[w] !== null).map(r => r[w]);
      avg[w] = values.length > 0 ? Number((values.reduce((a, b) => a + b, 0) / values.length).toFixed(1)) : null;
    });
    return avg;
  }, [currentRetentionData]);

  const tabs = [
    { id: 'retention', label: '📊 品牌留存分析' },
    { id: 'product', label: '🏆 产品对比' },
    { id: 'cohort', label: '👥 队列分析' },
    { id: 'conversion', label: '🔄 品类转化' },
    { id: 'flow', label: '🌊 用户流向' }
  ];

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
        marginBottom: '20px',
        padding: '20px',
        background: 'linear-gradient(135deg, rgba(0,102,204,0.15) 0%, rgba(0,160,220,0.08) 100%)',
        borderRadius: '16px',
        border: '1px solid rgba(0,102,204,0.25)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '6px' }}>
          <span style={{ fontSize: '28px' }}>☕</span>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '700',
            background: 'linear-gradient(90deg, #0066CC, #00CED1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0
          }}>瑞幸咖啡 美国市场用户分析仪表板</h1>
        </div>
        <p style={{ color: '#8892b0', fontSize: '12px', margin: 0 }}>
          数据周期: 2025年9月-12月 | 8家门店 | 71个SKU | 97万+用户
        </p>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              background: activeTab === tab.id 
                ? 'linear-gradient(135deg, #0066CC 0%, #00A0DC 100%)'
                : 'rgba(255,255,255,0.05)',
              color: activeTab === tab.id ? '#fff' : '#8892b0'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* ===== 品牌留存分析 ===== */}
        {activeTab === 'retention' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '22px' }}>🔥</span>
                  <h3 style={{ margin: 0, fontSize: '18px', color: '#00CED1' }}>产品留存率热力图 (%)</h3>
                </div>
                <div style={{ width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', color: '#FF4444' }}>∧</div>
              </div>
              
              <MonthFilter selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} availableMonths={availableMonths} />
              
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                  <thead>
                    <tr style={{ borderBottom: '3px solid #FF4444' }}>
                      <th style={{ padding: '10px', textAlign: 'left', color: '#00CED1', fontWeight: '600' }}>产品</th>
                      {['W0', 'W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'].map(w => (
                        <th key={w} style={{ padding: '10px', textAlign: 'center', color: '#8892b0', fontWeight: '500' }}>{w}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* 平均值基准行 */}
                    <tr style={{ background: 'rgba(255,68,68,0.15)', borderBottom: '2px solid #FF4444' }}>
                      <td style={{ padding: '8px', color: '#FF4444', fontWeight: '700', whiteSpace: 'nowrap', fontSize: '11px' }}>
                        {avgRetention.product}
                      </td>
                      {['W0', 'W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'].map(w => (
                        <td key={w} style={{ 
                          padding: '8px', 
                          textAlign: 'center',
                          background: '#FF4444',
                          color: '#fff',
                          fontWeight: '700',
                          borderRadius: '3px',
                          fontSize: '11px'
                        }}>
                          {avgRetention[w] || '-'}
                        </td>
                      ))}
                    </tr>
                    {currentRetentionData.map((row, i) => (
                      <tr key={i}>
                        <td style={{ padding: '8px', color: '#fff', fontWeight: '500', whiteSpace: 'nowrap', fontSize: '11px' }}>{row.product}</td>
                        {['W0', 'W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'].map(w => (
                          <td key={w} style={{ 
                            padding: '8px', 
                            textAlign: 'center',
                            background: getHeatColor(row[w]),
                            color: row[w] !== null && row[w] >= 20 ? '#fff' : '#1a1a2e',
                            fontWeight: '600',
                            borderRadius: '3px',
                            fontSize: '11px'
                          }}>
                            {row[w] !== null ? row[w] : '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div style={{ 
                marginTop: '12px', 
                padding: '10px', 
                background: 'rgba(0,0,0,0.2)', 
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                flexWrap: 'wrap',
                fontSize: '11px'
              }}>
                <span style={{ color: '#8892b0' }}>图例:</span>
                {[
                  { color: '#0066CC', label: '≥30%' },
                  { color: '#3385D6', label: '20-30%' },
                  { color: '#66A3E0', label: '10-20%' },
                  { color: '#99C2EB', label: '5-10%' },
                  { color: '#CCE0F5', label: '<5%' }
                ].map(item => (
                  <span key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <span style={{ width: '14px', height: '14px', background: item.color, borderRadius: '2px' }}></span>
                    <span style={{ color: '#ccc' }}>{item.label}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== 产品对比 (产品矩阵) ===== */}
        {activeTab === 'product' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '22px' }}>🎯</span>
                <h3 style={{ margin: 0, fontSize: '18px', color: '#00CED1' }}>产品矩阵分析</h3>
              </div>
              <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#8892b0' }}>
                横轴 = 日均销量(杯) · 纵轴 = 7日产品复购率(%)
              </p>
              <p style={{ margin: '0 0 12px 0', fontSize: '11px', color: '#666' }}>
                <span style={{ color: '#2ECC71' }}>● 右上=明星产品</span> · 
                <span style={{ color: '#3498DB' }}> ● 右下=引流产品</span> · 
                <span style={{ color: '#F39C12' }}> ● 左上=培育产品</span> · 
                <span style={{ color: '#95A5A6' }}> ● 左下=观察产品</span>
              </p>
              
              <MonthFilter selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} availableMonths={availableMonths} />
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '15px', fontSize: '10px' }}>
                <span style={{ color: '#8892b0' }}>品类:</span>
                {['基础黑咖', '基础奶咖', '特色奶咖', '抹茶', '特色黑咖', '超模瓶', '生咖', '瑞纳冰', '食品', 'LTO'].map(cat => (
                  <span key={cat} style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <span style={{ width: '8px', height: '8px', background: getCategoryColor(cat), borderRadius: '50%' }}></span>
                    <span style={{ color: '#ccc' }}>{cat}</span>
                  </span>
                ))}
              </div>

              <ResponsiveContainer width="100%" height={420}>
                <ScatterChart margin={{ top: 15, right: 15, bottom: 50, left: 50 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <ReferenceLine x={100} stroke="#666" strokeDasharray="5 5" />
                  <ReferenceLine y={12} stroke="#666" strokeDasharray="5 5" />
                  <XAxis 
                    dataKey="dailySales" 
                    name="日均销量" 
                    stroke="#8892b0" 
                    fontSize={10}
                    label={{ value: '日销量 (杯)', position: 'bottom', offset: 35, fill: '#8892b0', fontSize: 11 }}
                    domain={[0, 'auto']}
                  />
                  <YAxis 
                    dataKey="repurchaseRate" 
                    name="7日复购率" 
                    stroke="#8892b0" 
                    fontSize={10}
                    label={{ value: '7日复购率 (%)', angle: -90, position: 'left', offset: 35, fill: '#8892b0', fontSize: 11 }}
                    domain={[0, 30]}
                  />
                  <ZAxis dataKey="users" range={[80, 600]} />
                  <Tooltip 
                    contentStyle={{ background: '#1a1a2e', border: '1px solid #0066CC', borderRadius: '6px', fontSize: '11px' }}
                    formatter={(value, name) => {
                      if (name === 'dailySales') return [`${value.toFixed(1)} 杯/天`, '日均销量'];
                      if (name === 'repurchaseRate') return [`${value}%`, '7日复购率'];
                      return [value, name];
                    }}
                  />
                  <Scatter name="产品" data={currentMatrixData} fill="#8884d8">
                    {currentMatrixData.map((entry, index) => (
                      <Cell key={index} fill={getCategoryColor(entry.category)} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
              
              <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(0,102,204,0.1)', borderRadius: '6px', fontSize: '12px', color: '#8892b0' }}>
                💡 <strong style={{color: '#00CED1'}}>当前月份洞察 ({selectedMonth}):</strong>
                {selectedMonth === '9月' && " 9月产品复购率整体较高，生椰拿铁和京都抹茶拿铁为明星引流产品"}
                {selectedMonth === '10月' && " 10月爆米花拿铁爆发，但复购率较低；经典咖啡类复购表现稳定"}
                {selectedMonth === '11月' && " 11月太妃榛果和烤奶布丁等秋季新品上市，复购率有待观察"}
                {selectedMonth === '全部' && " 美式、冷萃和滴滤是高复购核心产品，LTO产品普遍低复购但高引流"}
              </div>
            </div>
          </div>
        )}

        {/* ===== 队列分析 (品类偏好转移) ===== */}
        {activeTab === 'cohort' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', color: '#00CED1' }}>
                用户2周内偏好转移比例
              </h3>
              <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#8892b0' }}>
                展示首购品类用户在2周内向其他品类转化的比例，对角线(红色高亮)为同品类复购率
              </p>
              
              <MonthFilter selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} availableMonths={['全部', '9月', '10月']} />
              
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '8px', textAlign: 'left', color: '#8892b0', borderBottom: '1px solid rgba(255,255,255,0.1)', whiteSpace: 'nowrap' }}>首购品类</th>
                      <th style={{ padding: '8px', textAlign: 'center', color: '#8892b0', borderBottom: '1px solid rgba(255,255,255,0.1)', whiteSpace: 'nowrap' }}>规模(千)</th>
                      <th style={{ padding: '8px', textAlign: 'center', color: '#2ECC71', borderBottom: '1px solid rgba(255,255,255,0.1)', fontWeight: '700', whiteSpace: 'nowrap' }}>2周留存率</th>
                      {categoryList.map(cat => (
                        <th key={cat} style={{ padding: '8px', textAlign: 'center', color: '#8892b0', borderBottom: '1px solid rgba(255,255,255,0.1)', whiteSpace: 'nowrap', fontSize: '10px' }}>{cat}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentTransferData.map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                        <td style={{ padding: '8px', color: '#fff', fontWeight: '500', whiteSpace: 'nowrap' }}>{row.category}</td>
                        <td style={{ padding: '8px', textAlign: 'center', color: '#8892b0' }}>{row.users.toFixed(2)}</td>
                        <td style={{ 
                          padding: '8px', 
                          textAlign: 'center', 
                          color: '#fff',
                          fontWeight: '700',
                          background: row.retention >= 50 ? '#E74C3C' : row.retention >= 40 ? '#C0392B' : '#922B21',
                          borderRadius: '3px'
                        }}>
                          {row.retention}%
                        </td>
                        {categoryList.map(cat => {
                          const value = row[cat];
                          const isSelf = row.category === cat;
                          return (
                            <td key={cat} style={{ 
                              padding: '8px', 
                              textAlign: 'center',
                              background: getTransferHeatColor(value, isSelf),
                              color: isSelf && value >= 10 ? '#fff' : value >= 5 ? '#fff' : '#ccc',
                              fontWeight: isSelf ? '700' : '400',
                              borderRadius: '3px'
                            }}>
                              {value}%
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(0,102,204,0.1)', borderRadius: '6px', fontSize: '11px', color: '#8892b0' }}>
                💡 <strong style={{color: '#00CED1'}}>关键洞察 ({selectedMonth}):</strong>
                {selectedMonth === '9月' && (
                  <>
                    <br/>• <strong>轻食</strong>留存率最高(67%)，是优质入口品类
                    <br/>• <strong>经典咖啡</strong>同品复购率最高(24%)，用户粘性强
                    <br/>• 抹茶系列和生椰系列存在显著相互转化
                  </>
                )}
                {selectedMonth === '10月' && (
                  <>
                    <br/>• 整体留存率下降，可能受季节影响
                    <br/>• <strong>轻食</strong>依然保持最高留存率(31%)
                    <br/>• 季节产品留存率最低(13%)，符合尝鲜型特征
                  </>
                )}
                {selectedMonth === '全部' && (
                  <>
                    <br/>• <strong>轻食</strong>整体留存率最高(63%)，跨品类转化能力强
                    <br/>• <strong>经典咖啡</strong>同品复购率最高(23%)，核心用户粘性强
                    <br/>• <strong>套餐</strong>用户留存高(72%)但规模小，可考虑推广
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===== 品类转化 (首购产品转化流向) ===== */}
        {activeTab === 'conversion' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <span style={{ fontSize: '22px' }}>📊</span>
                <h3 style={{ margin: 0, fontSize: '18px', color: '#00CED1' }}>首购产品转化流向分布</h3>
              </div>
              
              <MonthFilter selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} availableMonths={availableMonths} />
              
              <ResponsiveContainer width="100%" height={380}>
                <BarChart data={currentFlowData} layout="vertical" barCategoryGap="18%">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis type="number" stroke="#8892b0" fontSize={11} domain={[0, 100]} tickFormatter={v => `${v}%`} />
                  <YAxis dataKey="source" type="category" stroke="#8892b0" fontSize={10} width={130} />
                  <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid #0066CC', borderRadius: '6px', fontSize: '11px' }} formatter={(value) => [`${value}%`]} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="同品复购" stackId="a" fill="#2ECC71" />
                  <Bar dataKey="跨品类转化" stackId="a" fill="#F39C12" />
                  <Bar dataKey="流失" stackId="a" fill="#E74C3C" />
                </BarChart>
              </ResponsiveContainer>
              
              <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(0,102,204,0.1)', borderRadius: '6px', fontSize: '11px', color: '#8892b0' }}>
                💡 <strong style={{color: '#00CED1'}}>洞察 ({selectedMonth}):</strong>
                {selectedMonth === '9月' && " Cold Brew同品复购最高(21.2%)，Sausage Croissant跨品类转化最强(40.2%)"}
                {selectedMonth === '10月' && " 整体流失率上升，Iced Americano表现相对稳定(19.5%复购)"}
                {selectedMonth === '11月' && " 季节产品(太妃榛果、烤奶布丁)复购率提升，流失率仍较高"}
                {selectedMonth === '全部' && " Iced Americano(23.4%)和Cold Brew(18.6%)是高粘性产品，轻食是跨品类转化最佳入口"}
              </div>
            </div>
            
            {/* 新增: 月度流失趋势对比 */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#00CED1' }}>📈 月度留存趋势对比</h3>
              <ResponsiveContainer width="100%" height={250}>
                <ComposedChart data={mindmapDataEnhanced.monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="#8892b0" fontSize={11} />
                  <YAxis yAxisId="left" stroke="#2ECC71" fontSize={10} domain={[30, 50]} tickFormatter={v => `${v}%`} />
                  <YAxis yAxisId="right" orientation="right" stroke="#00A0DC" fontSize={10} domain={[0, 200000]} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid #0066CC', borderRadius: '6px', fontSize: '11px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar yAxisId="right" dataKey="newUsers" name="新用户数" fill="#00A0DC" opacity={0.7} />
                  <Line yAxisId="left" type="monotone" dataKey="retention" name="2周留存率" stroke="#2ECC71" strokeWidth={2} dot={{ r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ===== 用户流向 (增强版Mind Map) ===== */}
        {activeTab === 'flow' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* 用户生命周期漏斗 */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <span style={{ fontSize: '22px' }}>🌊</span>
                <h3 style={{ margin: 0, fontSize: '18px', color: '#00CED1' }}>用户周度流向分析 (Mind Map)</h3>
              </div>
              
              {/* 漏斗可视化 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '15px' }}>
                {mindmapDataEnhanced.weeklyRetention.map((item, idx) => (
                  <div key={item.week} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '15px',
                    marginLeft: idx * 30
                  }}>
                    <div style={{
                      padding: '10px 16px',
                      background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}CC 100%)`,
                      borderRadius: '8px',
                      fontWeight: '600',
                      minWidth: `${140 - idx * 12}px`,
                      textAlign: 'center',
                      boxShadow: `0 3px 12px ${item.color}40`
                    }}>
                      {item.week}<br/>
                      <span style={{ fontSize: `${20 - idx * 1.5}px` }}>{item.rate}%</span>
                    </div>
                    <span style={{ fontSize: '18px', color: item.color }}>→</span>
                    <div style={{
                      padding: '8px 12px',
                      background: `${item.color}20`,
                      borderRadius: '6px',
                      border: `1px solid ${item.color}40`,
                      fontSize: '11px',
                      color: item.color
                    }}>
                      {item.label}
                      {idx === 1 && <span style={{ color: '#E74C3C', marginLeft: '8px' }}>(-71.9% 流失)</span>}
                      {idx === 3 && <span style={{ color: '#F39C12', marginLeft: '8px' }}>(月度关键节点)</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 高价值 vs 低留存产品对比 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div style={{
                background: 'rgba(46,204,113,0.1)',
                borderRadius: '12px',
                padding: '18px',
                border: '1px solid rgba(46,204,113,0.3)'
              }}>
                <h4 style={{ margin: '0 0 12px 0', color: '#2ECC71', fontSize: '14px' }}>⭐ 高价值产品 (高留存+高频)</h4>
                {mindmapDataEnhanced.highValueProducts.map(p => (
                  <div key={p.name} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    padding: '8px 0', 
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    fontSize: '12px'
                  }}>
                    <span style={{ color: '#fff' }}>{p.name}</span>
                    <span style={{ color: '#2ECC71' }}>W1: {p.w1Retention}% | {p.avgCups || p.crossSell}杯/周</span>
                  </div>
                ))}
                <div style={{ marginTop: '10px', fontSize: '11px', color: '#8892b0' }}>
                  💡 这些产品应作为核心推荐，培养用户习惯
                </div>
              </div>
              
              <div style={{
                background: 'rgba(231,76,60,0.1)',
                borderRadius: '12px',
                padding: '18px',
                border: '1px solid rgba(231,76,60,0.3)'
              }}>
                <h4 style={{ margin: '0 0 12px 0', color: '#E74C3C', fontSize: '14px' }}>⚠️ 低留存产品 (需优化)</h4>
                {mindmapDataEnhanced.lowRetentionProducts.map(p => (
                  <div key={p.name} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    padding: '8px 0', 
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    fontSize: '12px'
                  }}>
                    <span style={{ color: '#fff' }}>{p.name}</span>
                    <span style={{ color: '#E74C3C' }}>W1: {p.w1Retention}% | {p.type}</span>
                  </div>
                ))}
                <div style={{ marginTop: '10px', fontSize: '11px', color: '#8892b0' }}>
                  💡 首购后引导转化至高留存产品
                </div>
              </div>
            </div>

            {/* 跨品类转化路径 */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              padding: '18px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <h4 style={{ margin: '0 0 15px 0', color: '#00CED1', fontSize: '15px' }}>🔄 高效跨品类转化路径</h4>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
                {mindmapDataEnhanced.conversionPaths.map((path, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 14px',
                    background: 'rgba(0,206,209,0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(0,206,209,0.3)'
                  }}>
                    <span style={{ color: '#fff', fontWeight: '500', fontSize: '12px' }}>{path.from}</span>
                    <span style={{ color: '#00CED1', fontSize: '18px' }}>→</span>
                    <span style={{ color: '#2ECC71', fontWeight: '500', fontSize: '12px' }}>{path.to}</span>
                    <span style={{ background: '#0066CC', padding: '2px 6px', borderRadius: '10px', fontSize: '10px' }}>{path.rate}%</span>
                    <span style={{ color: '#8892b0', fontSize: '10px' }}>({path.insight})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 关键指标卡片 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
              {[
                { label: 'W1流失率', value: '71.9%', color: '#E74C3C', icon: '⚠️' },
                { label: 'W4月留存', value: '20.5%', color: '#F39C12', icon: '📊' },
                { label: 'W12季度留存', value: '5.0%', color: '#00CED1', icon: '📈' },
                { label: '人均周消费', value: '2.15杯', color: '#2ECC71', icon: '☕' },
                { label: '累计触达率', value: '54.3%', color: '#9B59B6', icon: '🎯' }
              ].map(stat => (
                <div key={stat.label} style={{
                  padding: '14px',
                  background: `${stat.color}15`,
                  borderRadius: '10px',
                  border: `1px solid ${stat.color}30`,
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '18px', marginBottom: '4px' }}>{stat.icon}</div>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: '10px', color: '#8892b0', marginTop: '3px' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* 流失原因分析 */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              padding: '18px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <h4 style={{ margin: '0 0 15px 0', color: '#E74C3C', fontSize: '15px' }}>📉 流失原因分析</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                <div style={{ padding: '12px', background: 'rgba(231,76,60,0.1)', borderRadius: '8px' }}>
                  <div style={{ color: '#E74C3C', fontWeight: '600', marginBottom: '8px' }}>W1流失 (71.9%)</div>
                  <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', color: '#8892b0' }}>
                    {mindmapDataEnhanced.churnAnalysis.w1Churn.reasons.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
                <div style={{ padding: '12px', background: 'rgba(243,156,18,0.1)', borderRadius: '8px' }}>
                  <div style={{ color: '#F39C12', fontWeight: '600', marginBottom: '8px' }}>W1-W4流失 (7.6%)</div>
                  <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', color: '#8892b0' }}>
                    {mindmapDataEnhanced.churnAnalysis.w4Churn.reasons.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
                <div style={{ padding: '12px', background: 'rgba(0,206,209,0.1)', borderRadius: '8px' }}>
                  <div style={{ color: '#00CED1', fontWeight: '600', marginBottom: '8px' }}>W4-W12流失 (9.8%)</div>
                  <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', color: '#8892b0' }}>
                    {mindmapDataEnhanced.churnAnalysis.w12Churn.reasons.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 策略建议 */}
            <div style={{
              background: 'rgba(0,102,204,0.1)',
              borderRadius: '16px',
              padding: '18px',
              border: '1px solid rgba(0,102,204,0.2)'
            }}>
              <h4 style={{ margin: '0 0 12px 0', color: '#00CED1', fontSize: '15px' }}>💡 业务策略建议</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', fontSize: '11px' }}>
                <div style={{ padding: '12px', background: 'rgba(46,204,113,0.1)', borderRadius: '8px' }}>
                  <div style={{ color: '#2ECC71', fontWeight: '600', marginBottom: '6px' }}>🎯 提升W1留存</div>
                  <ul style={{ margin: 0, paddingLeft: '14px', color: '#8892b0' }}>
                    <li>首购后24h推送第二杯半价</li>
                    <li>7天内复购积分翻倍</li>
                    <li>首周专属优惠券</li>
                  </ul>
                </div>
                <div style={{ padding: '12px', background: 'rgba(243,156,18,0.1)', borderRadius: '8px' }}>
                  <div style={{ color: '#F39C12', fontWeight: '600', marginBottom: '6px' }}>📦 优化产品组合</div>
                  <ul style={{ margin: 0, paddingLeft: '14px', color: '#8892b0' }}>
                    <li>主推高留存产品</li>
                    <li>食品+饮品套餐</li>
                    <li>LTO引流+经典转化</li>
                  </ul>
                </div>
                <div style={{ padding: '12px', background: 'rgba(0,160,220,0.1)', borderRadius: '8px' }}>
                  <div style={{ color: '#00A0DC', fontWeight: '600', marginBottom: '6px' }}>🔄 跨品类引导</div>
                  <ul style={{ margin: 0, paddingLeft: '14px', color: '#8892b0' }}>
                    <li>基于首购智能推荐</li>
                    <li>季节产品→经典款</li>
                    <li>口味升级路径</li>
                  </ul>
                </div>
                <div style={{ padding: '12px', background: 'rgba(231,76,60,0.1)', borderRadius: '8px' }}>
                  <div style={{ color: '#E74C3C', fontWeight: '600', marginBottom: '6px' }}>🚨 流失预警</div>
                  <ul style={{ margin: 0, paddingLeft: '14px', color: '#8892b0' }}>
                    <li>W2未复购用户召回</li>
                    <li>监控高流失产品</li>
                    <li>个性化挽回策略</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '25px', padding: '12px', color: '#8892b0', fontSize: '10px' }}>
        数据周期: 2025年9月-12月 | 8家门店 | 71个SKU | 数据来源: 品牌留存.csv, 品类转化.xlsx, 杯量和收入-1203.xlsx
      </div>
    </div>
  );
}
