import { PricingTable } from "@clerk/nextjs"
import { WalletCards } from "lucide-react";

const Billing = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-10">
        <h2 className="font-bold text-3xl text-white mb-2 flex items-center justify-center gap-3">
          <WalletCards className="text-cyan-400" /> Upgrade your Plan
        </h2>
        
        <p className="text-slate-400">
          Unlock unlimited AI course generations and premium features.
        </p>
      </div>

      <div className="w-full">
        <div className="bg-slate-900/30 p-4 rounded-3xl border border-white/5">
          <PricingTable />
        </div>
      </div>
    </div>
  );
}

export default Billing