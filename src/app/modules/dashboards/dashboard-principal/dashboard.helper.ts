export const defaultChartConfig = {
    spanGaps: false,
    maintainAspectRatio: false,
    tooltips: {
        position: 'nearest',
        mode: 'index',
        intersect: false
    },
    layout: {
        padding: {
            left: 24,
            right: 32
        }
    },
    elements: {
        point: {
            radius: 4,
            borderWidth: 2,
            hoverRadius: 4,
            hoverBorderWidth: 2
        }
    },
    scales: {
        xAxes: [
            {
                gridLines: {
                    display: false
                },
                ticks: {
                    fontColor: 'rgba(0,0,0,0.54)'
                }
            }
        ],
        yAxes: [
            {
                gridLines: {
                    tickMarkLength: 16
                },
            }
        ]
    },
    plugins: {
        filler: {
            propagate: false
        }
    }
};

export const defaultLineChartConfig = {
    colors: [
        {
            borderColor: '#42a5f5',
            backgroundColor: '#42a5f5',
            pointBackgroundColor: '#1e88e5',
            pointHoverBackgroundColor: '#1e88e5',
            pointBorderColor: '#ffffff',
            pointHoverBorderColor: '#ffffff'
        }
    ],
    options: {
        spanGaps: false,
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 32,
                left: 32,
                right: 32
            }
        },
        elements: {
            point: {
                radius: 4,
                borderWidth: 2,
                hoverRadius: 4,
                hoverBorderWidth: 2
            },
            line: {
                tension: 0
            }
        },
        scales: {
            xAxes: [
                {
                    gridLines: {
                        display: false,
                        drawBorder: false,
                        tickMarkLength: 18
                    },
                    ticks: {
                        fontColor: '#ffffff'
                    }
                }
            ],
            yAxes: [
                {
                    display: false,
                    ticks: {
                        min: 1.5,
                        max: 5,
                        stepSize: 0.5
                    }
                }
            ]
        },
        plugins: {
            filler: {
                propagate: false
            },
            xLabelsOnTop: {
                active: true
            }
        }
    }
};