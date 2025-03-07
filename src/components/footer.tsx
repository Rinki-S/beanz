"use client";

export function Footer() {
  return (
    <footer className="border-t bg-white dark:bg-gray-800 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} 咖啡豆标签生成器 | Beanz</p>
          <p className="mt-1">为咖啡爱好者设计，让分享咖啡豆更加简单</p>
        </div>
      </div>
    </footer>
  );
}
