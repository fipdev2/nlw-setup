import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';

interface HabitListProps {
    date: Date;
    onCompletedChanged: (completed: number) => void
}
interface HabitData {
    possibleHabits: {
        id: string;
        title: string;
        created_at: string;
    }[],
    completedHabits: string[]
}

function HabitList({ date, onCompletedChanged }: HabitListProps) {
    const [habitData, setHabitData] = useState<HabitData>()


    useEffect(() => {
        api.get('/day', {
            params: {
                date: date.toISOString()
            }
        }).then(response => {
            setHabitData(response.data)
        })
    }, [])

    const isDateInThePast = dayjs(date).endOf('day').isBefore(new Date());

    async function handleToggleHabit(habitId: string) {

        let completedHabits: string[] = []
        await api.patch(`habits/${habitId}/toggle`)

        const isHabitAlreadyCompleted = habitData!.completedHabits.includes(habitId)
        if (isHabitAlreadyCompleted) {
            completedHabits = habitData!.completedHabits.filter(id => id !== habitId)
        } else {
            completedHabits = [...habitData!.completedHabits, habitId]

        }
        setHabitData({ possibleHabits: habitData!.possibleHabits, completedHabits })
        onCompletedChanged(completedHabits.length)
    }

    return (

        <div className='mt-6 flex flex-col gap-3'>

            {habitData?.possibleHabits.map((habit) => {
                return (    
                    <Checkbox.Root
                        key={habit.id}
                        onCheckedChange={() => handleToggleHabit(habit.id)}
                        disabled={isDateInThePast}
                        checked={habitData.completedHabits.includes(habit.id)}
                        className='flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed'>
                        <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 group-focus:ring-2 group-focus:ring-violet-900 group-focus:ring-offset-2 group-focus:ring-offset-background'>
                            <Checkbox.Indicator >
                                <Check size={20} className='text-white' />
                            </Checkbox.Indicator>
                        </div>
                        <span
                            className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'
                        >
                            {habit.title}
                        </span>
                    </Checkbox.Root>
                )
            })}

        </div>
    );
}

export default HabitList;