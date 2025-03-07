"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { toPng } from 'html-to-image';

interface CoffeeLabelProps {
  data?: {
    brand: string;
    flavor: string;
    origin: string;
    roastLevel: string;
    recipient: string;
    notes?: string;
    quantity?: string;
  };
}

const defaultData = {
  brand: "示例咖啡",
  flavor: "巧克力、坚果、焦糖",
  origin: "埃塞俄比亚",
  roastLevel: "medium",
  recipient: "咖啡爱好者",
  notes: "日晒处理",
  quantity: "200g",
};

// 烘焙程度的中文映射
const roastLevelMap: Record<string, string> = {
  "light": "极浅烘焙",
  "medium-light": "中浅烘焙",
  "medium": "中度烘焙",
  "medium-dark": "中深烘焙",
  "dark": "深度烘焙",
};

export function CoffeeLabelPreview({ data = defaultData }: CoffeeLabelProps) {
  const labelRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(1);

  // 打印标签
  const printLabel = async () => {
    if (!labelRef.current) return;

    try {
      // 转换标签为图片
      const dataUrl = await toPng(labelRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: 'white',
      });

      // 创建打印窗口
      const printWindow = window.open('', '_blank');
      if (!printWindow) return;

      // 计算每行可以放置的标签数量
      const labelsPerRow = Math.floor(210 / 74.25); // A4宽度约为210mm
      
      // 生成多个标签的HTML，按照每行最多放置labelsPerRow个标签的方式排列
      const rows = [];
      for (let i = 0; i < copies; i += labelsPerRow) {
        const rowLabels = Array(Math.min(labelsPerRow, copies - i)).fill(null).map(() => 
          `<div class="label-container"><img src="${dataUrl}" style="width:100%;height:100%;display:block;margin:0;padding:0;" /></div>`
        ).join('');
        rows.push(`<div class="label-row">${rowLabels}</div>`);
      }
      
      const labelImages = rows.join('');

      // 写入打印页面
      printWindow.document.write(`
        <html>
          <head>
            <title>咖啡标签打印</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=BioRhyme:wght@200..800&display=swap" rel="stylesheet">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=BioRhyme:wght@200..800&display=swap');
              @page {
                size: A4;
                margin: 0;
              }
              body {
                margin: 0;
                padding: 0;
                background-color: white;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-content: flex-start;
                gap: 0;
                font-size: 0; /* 消除行内元素间的空白 */
              }
              .label-row {
                display: flex;
                flex-direction: row;
                width: 100%;
                justify-content: flex-start;
                padding: 0;
                margin: 0;
                font-size: 0; /* 消除行内元素间的空白 */
                line-height: 0;
              }
              .label-container {
                width: 74.25mm; /* 297px / 4 = 74.25mm */
                height: 105mm; /* 420px / 4 = 105mm */
                margin: 0;
                padding: 0;
                display: inline-block;
                font-size: 0;
                line-height: 0;
                vertical-align: top;
                box-sizing: border-box;
                overflow: hidden;
              }
              img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                display: block;
                margin: 0;
                padding: 0;
                border: none;
              }
              body {
                font-family: 'BioRhyme', serif;
              }
              .font-biorhyme {
                font-family: 'BioRhyme', serif !important;
              }
              @media print {
                body {
                  background-color: white;
                }
              }
            </style>
          </head>
          <body>
            ${labelImages}
            <script>
              window.onload = function() {
                window.print();
                window.setTimeout(function() {
                  window.close();
                }, 500);
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    } catch (error) {
      console.error('标签转换失败:', error);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-2 border-dashed p-2 shadow-sm">
        <CardContent className="p-4" ref={labelRef}>
          <div className="w-[297px] h-[420px] bg-white border border-black">
            <div className="w-full h-full p-[12px] flex flex-col justify-between">
              {/* Brand Name */}
              <span className="text-black text-[36px] font-biorhyme break-words" style={{fontWeight: 300}}>
                {data.brand}
              </span>

              {/* Divider */}
              <div className="h-0 border border-black border-[0.5px]" />

              {/* Details Section */}
              <div className="flex flex-col justify-start items-start gap-[8px] w-[240px]">
                {/* Processing Method */}
                <div>
                  <span className="text-black text-[12px] font-bold font-sans block">处理方式</span>
                  <span className="text-black text-[16px] font-normal font-sans">{data.notes || "无"}</span>
                </div>

                {/* Origin */}
                <div>
                  <span className="text-black text-[12px] font-bold font-sans block">产地</span>
                  <span className="text-black text-[16px] font-normal font-sans">{data.origin}</span>
                </div>

                {/* Flavors */}
                <div>
                  <span className="text-black text-[12px] font-bold font-sans block">风味特征</span>
                  <span className="text-black text-[16px] font-normal font-sans">{data.flavor}</span>
                </div>

                {/* Roasting Level */}
                <div>
                  <span className="text-black text-[12px] font-bold font-sans block">烘焙程度</span>
                  <span className="text-black text-[16px] font-normal font-sans">{roastLevelMap[data.roastLevel] || data.roastLevel}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-0 border border-black border-[0.5px]" />

              {/* Notes */}
              <div>
                <span className="text-black text-[12px] font-biorhyme block" style={{fontWeight: 700}}>备注</span>
                <span className="text-black text-[16px] font-biorhyme block" style={{fontWeight: 350}}>{data.notes || 'Enjoy ;)'}</span>
              </div>

              {/* Bottom Divider */}
              <div className="h-0 border border-black border-[0.5px]" />

              {/* Footer */}
              <div className="flex justify-between items-end w-full">
                <div style={{maxWidth: '200px'}}>
                  <span className="text-black text-[12px] font-biorhyme block" style={{fontWeight: 700}}>for</span>
                  <span className="text-black text-[16px] font-biorhyme mt-[-6px]" style={{display: 'inline-block', whiteSpace: 'nowrap', fontWeight: 350}}>{data.recipient}</span>
                </div>
                <span className="text-black text-[16px] font-biorhyme" style={{fontWeight: 350}}>{data.quantity || "100 g"}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCopies(Math.max(1, copies - 1))}
          >
            -
          </Button>
          <span className="w-8 text-center">{copies}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCopies(copies + 1)}
          >
            +
          </Button>
        </div>
        <Button onClick={printLabel}>打印 {copies} 份标签</Button>
      </div>
    </div>
  );
}
