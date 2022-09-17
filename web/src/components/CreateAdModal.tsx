
import { Check, GameController } from 'phosphor-react';
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Input } from './Form/Input';
import { Game } from '../App';
import { FormEvent, useRef, useState } from 'react';
import axios from 'axios';

const dayOptions = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado'
]

interface CreateAdModalProps {
    games: Game[]
}

export function CreateAdModal(props: CreateAdModalProps) {
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)

    function resetForm() {
        setWeekDays([])
        setUseVoiceChannel(false)
        formRef.current?.reset()
    }

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel
            })
            alert('Anúncio criado com sucesso!')
            resetForm()
        } catch (error) {
            console.log(error)
            alert('Erro ao criar anúncio :c')
        }

    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

            <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[30rem] shadow-lg shadow-black/25'>
                <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>
                <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4' ref={formRef}>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="game" className='font-semibold'>Qual o game?</label>
                        <select
                            name='game' id='game'
                            placeholder='Selecione o game que deseja jogar'
                            defaultValue=""
                            required
                            className='bg-zinc-900 py-3 px-4 rounded text-sm invalid:text-zinc-500'
                        >
                            <option disabled value="">Selecione o game para jogar</option>
                            {props.games.map(game => (
                                <option key={game.id} value={game.id} >{game.title}</option>
                            ))}
                        </select>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name">Seu nome (ou nick)</label>
                        <Input type="text" name='name' id="name" required placeholder='Como te chamam dentro do game?' />
                    </div>

                    <div className='grid grid-cols-2 gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                            <Input name='yearsPlaying' id='yearsPlaying' type="number" required placeholder='tudo bem ser ZERO' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="discord">Qual seu Discord?</label>
                            <Input name='discord' id='discord' type="text" required placeholder='Usuário#000' />
                        </div>
                    </div>

                    <div className='flex gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="weekDays">Quando costuma jogar?</label>
                            <ToggleGroup.Root
                                className='grid grid-cols-4 gap-2 [&_[data-state=on]]:bg-violet-500'
                                type='multiple'
                                value={weekDays}
                                onValueChange={setWeekDays}
                            >
                                {dayOptions.map((day, index) => (
                                    <ToggleGroup.Item
                                        key={day}
                                        value={index.toString()}
                                        className='w-8 h-8 rounded bg-zinc-900'
                                        title={day}>
                                        {day[0]}
                                    </ToggleGroup.Item>
                                ))}
                            </ToggleGroup.Root>
                        </div>
                        <div className='flex flex-col gap-2 flex-1'>
                            <label htmlFor="hourStart">Qual horário do dia?</label>
                            <div className='grid grid-cols-2 gap-2'>
                                <Input name='hourStart' id='hourStart' type="time" required />
                                <Input name='hourEnd' id='hourEnd' type="time" required />
                            </div>
                        </div>
                    </div>

                    <label className='mt-2 flex items-center gap-2 text-sm'>
                        <Checkbox.Root
                            checked={useVoiceChannel}
                            onCheckedChange={(checked) => setUseVoiceChannel(checked === true ? true : false)}
                            className='w-6 h-6 p-1 rounded bg-zinc-900'>
                            <Checkbox.CheckboxIndicator>
                                <Check className='w-4 h-4 text-emerald-400' />
                            </Checkbox.CheckboxIndicator>
                        </Checkbox.Root>
                        Costumo me concectar ao chat de voz
                    </label>

                    <footer className='flex justify-end gap-4 mt-4'>
                        <Dialog.Close
                            type='button'
                            className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 transition-colors'>
                            Cancelar
                        </Dialog.Close>
                        <button
                            type='submit'
                            className='flex items-center gap-3 bg-violet-500 px-5 h-12 rounded-md font-semibold hover:bg-violet-600 transition-colors'
                        >
                            <GameController className='w-6 h-6' />
                            Encontrar duo
                        </button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}
