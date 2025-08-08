import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-4xl font-bold">Welcome to My App</h1>
      <p className="mb-6 text-lg">This is a simple Next.js application.</p>
      <Button className="bg-blue-500 text-white hover:bg-blue-600">
        Get Started
      </Button>
    </div>
  );
};

export default HomePage;
