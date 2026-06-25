import LivingInterface from "./components/LivingInterface";
import SignalFieldProvider from "./components/SignalFieldProvider";

export default function Home() {
  return (
    <SignalFieldProvider>
      <LivingInterface />
    </SignalFieldProvider>
  );
}
