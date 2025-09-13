/**
 * Sistema de Reservas de Voo
 * Desenvolvedor: Luan Oliveira dos Santos
 * Projeto: Desafio Dev Day 2025
 * 
 * Aplicação modular para reserva de voos com seleção de data,
 * horário e geração de tickets com QR code.
 */

// Main application module
import { Calendar } from './calendar.js';
import { ChatWidget } from './chat.js';
import { BookingSystem } from './booking.js';

export class App {
    constructor() {
        this.calendar = null;
        this.chatWidget = null;
        this.bookingSystem = null;
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        try {
            // Initialize calendar
            this.calendar = new Calendar();
            
            // Initialize chat widget
            this.chatWidget = new ChatWidget();
            
            // Initialize booking system with calendar reference
            this.bookingSystem = new BookingSystem(this.calendar);
            
            console.log('Sistema de reservas inicializado com sucesso!');
        } catch (error) {
            console.error('Erro ao inicializar o sistema:', error);
        }
    }

    // Public methods for external access if needed
    getCalendar() {
        return this.calendar;
    }

    getChatWidget() {
        return this.chatWidget;
    }

    getBookingSystem() {
        return this.bookingSystem;
    }
}

// Initialize the app when this module is loaded
const app = new App();

// Export for potential external use
export default app;
