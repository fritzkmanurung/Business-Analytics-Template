// Chart.js Configuration and Data
// Business Analytics Dashboard Charts

// Chart color scheme matching the theme
function getChartColors() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';

  return {
    primary: 'rgba(139, 92, 246, 1)',
    secondary: 'rgba(167, 139, 250, 1)',
    accent: 'rgba(196, 181, 253, 1)',
    success: 'rgba(34, 197, 94, 1)',
    warning: 'rgba(251, 146, 60, 1)',
    danger: 'rgba(239, 68, 68, 1)',
    grid: isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)',
    text: isLight ? '#64748b' : 'rgba(255, 255, 255, 0.7)'
  };
}

// Default chart options generator
function getChartOptions() {
  const colors = getChartColors();
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: colors.text,
          font: {
            family: 'Inter, sans-serif',
            size: 12
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          color: colors.text,
          font: {
            family: 'Inter, sans-serif'
          }
        },
        grid: {
          color: colors.grid,
          drawBorder: false
        }
      },
      x: {
        ticks: {
          color: colors.text,
          font: {
            family: 'Inter, sans-serif'
          }
        },
        grid: {
          color: colors.grid,
          drawBorder: false
        }
      }
    }
  };
}

// Revenue Chart
function initRevenueChart() {
  const ctx = document.getElementById('revenueChart');
  if (!ctx) return;

  const colors = getChartColors();
  const defaultOptions = getChartOptions();

  const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 350);
  gradient.addColorStop(0, 'rgba(139, 92, 246, 0.4)');
  gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 40000, 38000, 45000],
        borderColor: colors.primary,
        backgroundColor: gradient,
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: colors.primary,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 6
      }]
    },
    options: {
      ...defaultOptions,
      plugins: {
        ...defaultOptions.plugins,
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleFont: {
            size: 14,
            family: 'Inter, sans-serif'
          },
          bodyFont: {
            size: 13,
            family: 'Inter, sans-serif'
          },
          callbacks: {
            label: function (context) {
              return 'Revenue: $' + context.parsed.y.toLocaleString();
            }
          }
        }
      },
      scales: {
        ...defaultOptions.scales,
        y: {
          ...defaultOptions.scales.y,
          ticks: {
            ...defaultOptions.scales.y.ticks,
            callback: function (value) {
              return '$' + (value / 1000) + 'k';
            }
          }
        }
      }
    }
  });
}

// User Activity Chart
function initActivityChart() {
  const ctx = document.getElementById('activityChart');
  if (!ctx) return;

  const colors = getChartColors();
  const defaultOptions = getChartOptions();

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Active Users',
          data: [1200, 1900, 1500, 2100, 1800, 900, 800],
          backgroundColor: colors.primary,
          borderRadius: 6,
          borderSkipped: false
        },
        {
          label: 'New Users',
          data: [400, 600, 500, 700, 600, 300, 250],
          backgroundColor: colors.secondary,
          borderRadius: 6,
          borderSkipped: false
        }
      ]
    },
    options: {
      ...defaultOptions,
      plugins: {
        ...defaultOptions.plugins,
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleFont: {
            size: 14,
            family: 'Inter, sans-serif'
          },
          bodyFont: {
            size: 13,
            family: 'Inter, sans-serif'
          }
        }
      }
    }
  });
}

// Traffic Sources Chart (Doughnut)
function initTrafficChart() {
  const ctx = document.getElementById('trafficChart');
  if (!ctx) return;

  const colors = getChartColors();

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Organic Search', 'Direct', 'Social Media', 'Referral', 'Email'],
      datasets: [{
        data: [45, 25, 15, 10, 5],
        backgroundColor: [
          colors.primary,
          colors.secondary,
          colors.accent,
          colors.success,
          colors.warning
        ],
        borderWidth: 0,
        spacing: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: colors.text,
            font: {
              family: 'Inter, sans-serif',
              size: 11
            },
            padding: 12,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleFont: {
            size: 14,
            family: 'Inter, sans-serif'
          },
          bodyFont: {
            size: 13,
            family: 'Inter, sans-serif'
          },
          callbacks: {
            label: function (context) {
              return context.label + ': ' + context.parsed + '%';
            }
          }
        }
      }
    }
  });
}

// Export chart as image
function exportChart(chartId) {
  const canvas = document.getElementById(chartId);
  if (!canvas) return;

  const url = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `${chartId}-${Date.now()}.png`;
  link.href = url;
  link.click();
}

// Update chart time range
function updateTimeRange(chartType, days) {
  console.log(`Updating ${chartType} chart to show last ${days} days`);
  // In a real application, this would fetch new data and update the chart
  // For now, we'll just log the action
}

// Initialize all charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  initRevenueChart();
  initActivityChart();
  initTrafficChart();
});
