import { useClientUser } from '@/lib/auth-client';
import { motion } from 'framer-motion';

export const Greeting = () => {
    const { session } = useClientUser()
    return (
        <div
            key="overview"
            className="max-w-3xl mx-auto md:mt-20 px-8 size-full flex flex-col justify-center items-center"
        >
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.5 }}
                className="text-4xl font-semibold text-center"
            >
                {session ? `Hello, ${session.user.name}!` : ''}
            </motion.div>
        </div>
    );
};
