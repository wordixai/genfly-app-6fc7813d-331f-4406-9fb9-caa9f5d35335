import { Calculator } from "@/components/Calculator";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">Calculator App</h1>
        <Calculator />
      </div>
    </div>
  );
};

export default Index;