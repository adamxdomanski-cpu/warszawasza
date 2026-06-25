import LivingInterface from "./components/LivingInterface";
import LucyAttention from "./components/LucyAttention";
import SignalFieldProvider from "./components/SignalFieldProvider";

export default function Home() {
  return (
    <SignalFieldProvider>
      <LucyAttention />
      <LivingInterface />
    </SignalFieldProvider>
  );
}
