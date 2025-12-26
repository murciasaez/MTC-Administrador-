import React from 'react';
import { Sidebar } from './Sidebar';

export const MobileHeader: React.FC = () => (
    <div className="md:hidden flex items-center justify-between p-4 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark sticky top-0 z-20">
        <div className="flex items-center gap-2">
            <div className="bg-center bg-no-repeat bg-cover rounded-full h-8 w-8" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAIkdRP7Pylp8EfGgoqFGfjrEeW-qDh-RLKrGsmt3uFQ-4yziKgffvg1BjqciudSlh4Szjs6GmymOQPbIAzTdnUQF2bwV_kHitZiTie8V-kOUbgVpSrShgJVUfqSAJRM5m_bKUsLoyoFaLxKbyNUTbVC_Qyc8nKk8DJ9ULCt92nyIIQsw0sXT1zNJJZq5rf72juZtbe9DpNzArgpiIepvwSJZXHK-dsc4Rp2p5wZbOX6Tx4XhEU5FJ9rXyvXNa6u2SAkzpBtI5jydE")'}}>
            </div>
            <span className="font-bold text-text-main-light dark:text-white">MTC Admin</span>
        </div>
        <button className="text-text-main-light dark:text-white">
            <span className="material-symbols-outlined">menu</span>
        </button>
    </div>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark">
            <Sidebar />
            <div className="flex-1 flex flex-col h-full w-full overflow-hidden relative">
                    <MobileHeader />
                    <main className="flex-1 overflow-y-auto">
                    {children}
                    </main>
            </div>
        </div>
    );
};