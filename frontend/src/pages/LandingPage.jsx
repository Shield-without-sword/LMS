import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpen, Lightbulb, Layers, ArrowRight } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <BookOpen className="w-12 h-12 text-blue-600" />,
      title: "Comprehensive Courses",
      description: "Master Full-Stack Development with in-depth tutorials."
    },
    {
      icon: <Lightbulb className="w-12 h-12 text-blue-600" />,
      title: "Hands-On Projects",
      description: "Work on real-world projects and build your portfolio."
    },
    {
      icon: <Layers className="w-12 h-12 text-blue-600" />,
      title: "Collaborative Learning",
      description: "Engage in discussions and learn with a community."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 p-6 relative overflow-hidden">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto mt-20 z-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 animate-fade-in-down">
          Elevate Your <span className="text-blue-700">Full-Stack Skills</span>
        </h1>
        <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto text-gray-600">
          Your go-to platform for mastering Full-Stack Development through interactive courses, coding exercises, and collaborative discussions.
        </p>
      </div>

      {/* Call-to-Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 mb-16 z-10">
        <Button
          onClick={() => navigate("/signup")}
          className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 text-lg flex items-center gap-2 group"
        >
          Get Started
          <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
        </Button>
        <Button
          onClick={() => navigate("/login")}
          className="px-8 py-4 bg-blue-200 text-blue-800 font-semibold rounded-lg shadow-lg hover:bg-blue-300 transition-all duration-300 text-lg"
        >
          Sign In
        </Button>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto z-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-6 transform hover:scale-105 transition-all duration-300 shadow-sm"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-blue-800">{feature.title}</h3>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[40rem] h-[40rem] bg-blue-300 opacity-30 blur-3xl rounded-full -top-40 -left-40"></div>
        <div className="absolute w-[40rem] h-[40rem] bg-blue-500 opacity-20 blur-3xl rounded-full -bottom-40 -right-40"></div>
      </div>
    </div>
  );
}
