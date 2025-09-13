// Booking functionality module
export class BookingSystem {
    constructor(calendar) {
        this.calendar = calendar;
        this.confirmBtn = document.getElementById('confirm-booking');
        this.bookingInterface = document.getElementById('booking-interface');
        this.ticketDisplay = document.getElementById('ticket-display');
        this.newBookingBtn = document.getElementById('new-booking');
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkInitialState();
        this.setupCalendarIntegration();
    }

    setupCalendarIntegration() {
        // Override the calendar's updateConfirmButton to also update our button
        const originalUpdateConfirmButton = this.calendar.updateConfirmButton.bind(this.calendar);
        this.calendar.updateConfirmButton = () => {
            originalUpdateConfirmButton();
            this.updateConfirmButton();
        };
    }

    updateConfirmButton() {
        const hasSelection = this.calendar.selectedDate && this.calendar.selectedFlight !== null;
        this.confirmBtn.disabled = !hasSelection;
        
        if (!this.confirmBtn.disabled) {
            this.confirmBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            this.confirmBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }

    checkInitialState() {
        if (!this.calendar.selectedDate) {
            this.confirmBtn.disabled = true;
            this.confirmBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }

    bindEvents() {
        this.confirmBtn.addEventListener('click', () => {
            if (!this.confirmBtn.disabled) {
                this.showTicket();
            }
        });

        this.newBookingBtn.addEventListener('click', () => {
            this.resetBooking();
        });
    }

    showTicket() {
        const flights = ['06:30', '09:15', '12:45', '17:00', '20:30'];
        
        // Get data from calendar instance instead of window variables
        const selectedDate = this.calendar.selectedDate;
        const selectedFlight = this.calendar.selectedFlight;
        
        console.log('Dados selecionados:', { selectedDate, selectedFlight });
        
        if (!selectedDate || selectedFlight === null) {
            console.error('Data ou voo não selecionados');
            alert('Por favor, selecione uma data e um horário de voo antes de confirmar.');
            return;
        }
        
        const selectedTime = flights[selectedFlight];
        console.log('Horário selecionado:', selectedTime);
        
        const formatDate = (date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        };

        document.getElementById('ticket-date').textContent = formatDate(selectedDate);
        document.getElementById('departure-time').textContent = selectedTime;
        
        this.bookingInterface.classList.add('hidden');
        this.ticketDisplay.classList.remove('hidden');
        
        this.generateQRCode(selectedTime, formatDate(selectedDate));
        
        console.log('Ticket gerado com sucesso!');
    }

    generateQRCode(selectedTime, formattedDate) {
        const qrcodeContainer = document.getElementById('qrcode');
        qrcodeContainer.innerHTML = '';
        
        const ticketData = {
            flight: 'RS995',
            date: formattedDate,
            time: selectedTime,
            passenger: 'Rodrigo Terron',
            seat: '28A',
            from: 'GRU',
            to: 'SFO'
        };

        new QRCode(qrcodeContainer, {
            text: JSON.stringify(ticketData),
            width: 128,
            height: 128,
            colorDark: '#8B5CF6',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
    }

    resetBooking() {
        this.bookingInterface.classList.remove('hidden');
        this.ticketDisplay.classList.add('hidden');
        this.calendar.reset();
    }
}
