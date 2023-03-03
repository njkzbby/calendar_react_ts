import React, { FC, FormEvent } from 'react';
import { formatDate } from '../../utils/helpers/date';

import './Modal.css';

interface ModalProps {
    locale?: string;
    active: boolean;
    setActive: (status: boolean) => void;
    date: any;
}

interface CalendarEvent {
    name: string,
    description: string,
    date: any,
    participants: string,
}
export const Modal: FC<ModalProps> = ({ active, setActive, date }) => {
    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const targets = e.currentTarget.elements as HTMLFormControlsCollection; // todo: подумать

        // @ts-ignore
        const newEvent = Array.from<HTMLFormControl>(targets)
            // @ts-ignore
            .filter(element => element.type === 'text')
            .reduce((obj: CalendarEvent, element) => {
                // @ts-ignore
                obj[element.name] = element.value
                return obj
            }, {} as CalendarEvent);

        const prevEvents = JSON.parse(localStorage.getItem('events') || '[]');
        localStorage.setItem('events', JSON.stringify([...prevEvents, newEvent]));
    };

    return (
        <>
            <div
                className={active ? 'modal active' : 'modal'}
                onClick={() => setActive(false)}
            >
                <div className='modal__content' onClick={(e) => e.stopPropagation()}>
                    <div className='modal-header'>
                        <div className='modal-title'>
                            <button onClick={() => setActive(false)} className='button'>
                                Close
                            </button>
                        </div>
                    </div>
                    <div className='modal-body'>
                        <form onSubmit={handleFormSubmit} className='inputs'>
                            <div className='important-inputs'>
                                <input
                                    name='name'
                                    className='modal-input'
                                    placeholder='Название события'
                                    type='text'
                                    required
                                />
                                <input
                                    readOnly
                                    value={formatDate(date.date, 'DDD DD MMM YYYY')}
                                    name='date'
                                    className='modal-input'
                                    placeholder='Дата события'
                                    type='text'
                                    required
                                />
                                <input
                                    name='participants'
                                    className='modal-input'
                                    placeholder='Участники'
                                    type='text'
                                    required
                                />
                            </div>
                            <div className='descripthion-input'>
                                <input
                                    name='description'
                                    className='modal-input'
                                    placeholder='Описание'
                                    type='text'
                                />
                            </div>
                            <input type='submit'></input>
                        </form>
                    </div>
                    <div className='modal-footer'></div>
                </div>
            </div>
        </>
    );
};
