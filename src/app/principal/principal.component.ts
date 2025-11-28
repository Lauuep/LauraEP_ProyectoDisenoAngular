import { Component, effect, Signal } from '@angular/core';
import { theOffice, TheOfficeService } from '../the-office.service';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

  theOffice: Signal<theOffice[]>;
  chart: Chart | null = null;

  constructor(private servicio: TheOfficeService) {
    this.theOffice = this.servicio.theOffice;

    // Generamos la gráfica cuando la SIGNAL tenga datos
    effect(() => {
      const data = this.theOffice();

      if (!data || data.length === 0) return;

      // Obtener el canvas
      const canvas = document.getElementById('ratingChart') as HTMLCanvasElement;
      if (!canvas) return;

      // Destruir una gráfica anterior si existe
      if (this.chart) this.chart.destroy();

      // Crear gráfica nueva
      this.chart = new Chart(canvas, {
        type: 'line',
        data: {
          labels: data.map(ep => ep.title),
          datasets: [
            {
              label: 'IMDB Rating',
              data: data.map(ep => Number(ep.imdbRating)),
              borderColor: 'rgba(255, 193, 7, 1)',
              backgroundColor: 'rgba(255, 193, 7, 0.3)',
              pointBackgroundColor: 'rgba(255, 193, 7, 1)',
              borderWidth: 2,
              tension: 0.3,
              pointRadius: 5,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: false,
              min: 5,
              max: 10
            }
          }
        }
      });
    });
  }

}


