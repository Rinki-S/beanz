import { CoffeeForm } from "@/components/coffee-label/coffee-form";
import { Footer } from "@/components/footer";
import { Logo } from "@/components/ui/logo";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white dark:bg-gray-800 py-4 px-4 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <Logo />
          <div className="text-sm text-gray-500 dark:text-gray-400">为咖啡爱好者设计</div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">咖啡豆标签生成器</h1>
            <p className="text-gray-600 dark:text-gray-400">
              填写咖啡豆信息，生成可打印的标签，方便贴在分装袋上
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <CoffeeForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
