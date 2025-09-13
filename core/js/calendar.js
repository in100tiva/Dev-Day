// Calendar functionality module
export class Calendar {
    constructor() {
        this.months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        this.currentDate = new Date(2025, 8, 13);
        this.selectedDate = null;
        this.selectedFlight = null;
        
        this.currentMonthElement = document.getElementById('current-month');
        this.calendarGrid = document.getElementById('calendar-grid');
        this.prevMonthBtn = document.getElementById('prev-month');
        this.nextMonthBtn = document.getElementById('next-month');
        
        this.init();
    }

    init() {
        this.renderCalendar();
        this.bindEvents();
    }

    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        this.currentMonthElement.textContent = `${this.months[month]} ${year}`;
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        this.calendarGrid.innerHTML = '';
        
        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day text-center py-2 cursor-pointer rounded-lg';
            dayElement.textContent = date.getDate();
            
            if (date.getMonth() !== month) {
                dayElement.className += ' text-gray-300';
            } else if (date < new Date()) {
                dayElement.className += ' text-gray-400 cursor-not-allowed';
            } else {
                dayElement.addEventListener('click', () => this.selectDate(date, dayElement));
            }
            
            this.calendarGrid.appendChild(dayElement);
        }
    }

    selectDate(date, element) {
        if (date < new Date()) {
            return;
        }
        
        this.selectedDate = date;
        window.selectedDate = date;
        this.selectedFlight = null;
        window.selectedFlight = null;
        
        document.querySelectorAll('.calendar-day').forEach(day => {
            day.classList.remove('selected');
        });
        element.classList.add('selected');
        
        this.renderFlightOptions();
        this.updateConfirmButton();
    }

    renderFlightOptions() {
        const flightOptions = document.getElementById('flight-options');
        const flights = [
            { time: '06:30', price: 'R$ 1.250', available: true },
            { time: '09:15', price: 'R$ 1.180', available: true },
            { time: '12:45', price: 'R$ 1.320', available: false },
            { time: '17:00', price: 'R$ 995', available: true },
            { time: '20:30', price: 'R$ 1.150', available: true }
        ];
        
        flightOptions.innerHTML = '';
        
        flights.forEach((flight, index) => {
            const flightElement = document.createElement('div');
            flightElement.className = `flight-option p-4 border-2 border-gray-200 rounded-lg cursor-pointer ${!flight.available ? 'opacity-50 cursor-not-allowed' : ''}`;
            flightElement.innerHTML = `
                <div class="flex justify-between items-center">
                    <div>
                        <div class="font-semibold text-lg">${flight.time}</div>
                        <div class="text-sm text-gray-500">GRU → SFO</div>
                    </div>
                    <div class="text-right">
                        <div class="font-bold text-primary">${flight.price}</div>
                        <div class="text-sm ${flight.available ? 'text-green-600' : 'text-red-500'}">
                            ${flight.available ? 'Disponível' : 'Esgotado'}
                        </div>
                    </div>
                </div>
            `;
            
            if (flight.available) {
                flightElement.addEventListener('click', () => this.selectFlight(index, flightElement));
            }
            
            flightOptions.appendChild(flightElement);
        });
    }

    selectFlight(index, element) {
        this.selectedFlight = index;
        window.selectedFlight = index;
        
        document.querySelectorAll('.flight-option').forEach(option => {
            option.classList.remove('selected');
        });
        element.classList.add('selected');
        
        this.updateConfirmButton();
    }

    updateConfirmButton() {
        const confirmBtn = document.getElementById('confirm-booking');
        confirmBtn.disabled = !(this.selectedDate && this.selectedFlight !== null);
        
        if (!confirmBtn.disabled) {
            confirmBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            confirmBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }

    bindEvents() {
        this.prevMonthBtn.addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.renderCalendar();
        });
        
        this.nextMonthBtn.addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.renderCalendar();
        });
    }

    reset() {
        this.selectedDate = null;
        this.selectedFlight = null;
        window.selectedDate = null;
        window.selectedFlight = null;
        
        document.querySelectorAll('.calendar-day').forEach(day => {
            day.classList.remove('selected');
        });
        document.querySelectorAll('.flight-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        document.getElementById('flight-options').innerHTML = '<p class="text-gray-500 text-center py-8">Selecione uma data para ver os horários disponíveis</p>';
        
        const confirmButton = document.getElementById('confirm-booking');
        confirmButton.disabled = true;
        confirmButton.classList.add('opacity-50', 'cursor-not-allowed');
    }
}
