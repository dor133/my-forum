import { Text } from '../../../core/Text'
import { useGetMostActiveUsersAnalyticsQuery } from '../../../store/rtk/posts'
import { motion } from 'framer-motion'

const positions: Record<number, string> = {
    0: '1er',
    1: '2ème',
    2: '3ème',
}

const podiumOrder = [1, 0, 2]

export function HomeAnalytics() {
    const { data: mostActiveUsers, error: mostActiveUsersError, isLoading: mostActiveUsersLoading } = useGetMostActiveUsersAnalyticsQuery()
    const mostActiveUsersReverted = mostActiveUsers ? [mostActiveUsers[1], mostActiveUsers[0], mostActiveUsers[2]] : null

    return (
        <div className="border-t border-gray-200 py-1.5 pt-4">
            <Text variant="subtitle" className="pb-2">
                Top des utilisateurs les plus actifs
            </Text>

            {mostActiveUsersError ? (
                <div>Une erreur est survenue</div>
            ) : mostActiveUsersLoading ? (
                <div>Chargement...</div>
            ) : (
                <div
                    className="grid grid-flow-col-dense gap-4 mt-8 justify-center justify-items-center place-content-center content-end items-end border-b "
                    style={{ height: 250 }}
                >
                    {mostActiveUsersReverted?.map((data, index) => (
                        <div className="flex flex-col place-content-center">
                            <motion.div
                                custom={index}
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            delay: mostActiveUsersReverted.length - podiumOrder[index] + 1,
                                            duration: 0.75,
                                        },
                                    },
                                    hidden: { opacity: 0 },
                                }}
                                className="mb-1 self-center"
                            >
                                <span>{data.user.username}</span>
                            </motion.div>

                            <motion.div
                                custom={index}
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    visible: {
                                        height: 200 * ((mostActiveUsersReverted.length - podiumOrder[index]) / mostActiveUsersReverted.length),
                                        opacity: 1,
                                        transition: {
                                            delay: mostActiveUsersReverted.length - podiumOrder[index],
                                            duration: 2,
                                            ease: 'backInOut',
                                        },
                                    },
                                    hidden: { opacity: 0 },
                                }}
                                className="self-center bg-teal-600 flex w-16 border-teal-700 border border-b-0 rounded-t-lg shadow-lg place-content-center hover:border-teal-900 hover:bg-teal-500 cursor-pointer"
                                style={{
                                    filter: `opacity(${0.1 + (mostActiveUsersReverted.length - podiumOrder[index]) / mostActiveUsersReverted.length})`,
                                }}
                            >
                                <span className="self-end text-white font-semibold">{positions[podiumOrder[index]]}</span>
                            </motion.div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
