$(document).ready(function () {

	// areaChart
	$(function () {
		let options = {
			series: [],
			chart: {
				height: 350,
				type: 'area',
				toolbar: {
					show: false,
				},
			},
			legend: {
				show: true,
				fontSize: '14px',
				fontFamily: 'Roobert',
				fontWeight: 500,
				position: 'top',
				horizontalAlign: 'right',
				offsetX: 0,
				offsetY: 0,
				labels: {
					colors: '#160831',
				},
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				curve: 'smooth',
				width: 1,
			},
			xaxis: {
				type: 'month',
				categories: [
					'Jan',
					'',
					'',
					'Feb',
					'',
					'',
					'Mar',
					'',
					'',
					'Apr',
					'',
					'',
					'May',
					'',
					'',
					'Jun',
					'',
					'',
					'',
					'Jul',
					'',
					'',
					'Aug',
					'',
					'',
					'Sep',
					'',
					'',
					'Oct',
					'',
					'',
					'Nov',
					'',
					'',
					'Dec',
				],
				labels: {
					style: {
						colors: '#9B95A9',
						fontSize: '14px',
						fontFamily: 'Roobert',
						fontWeight: 500,
					},
				},
				axisBorder: {
					show: false,
				},
			},
			yaxis: {
				tickAmount: 5,
				min: -0,
				max: 1000,
				labels: {
					style: {
						colors: '#9B95A9',
						fontSize: '14px',
						fontFamily: 'Roobert',
						fontWeight: 500,
					},
					formatter: function (value) {
						return value;
					},
				},
			},
			tooltip: {
				x: {
					format: 'dd/MM/yy HH:mm',
				},
			},
			fill: {
				type: 'gradient',
				gradient: {
					shadeIntensity: 1,
					opacityFrom: 0.4,
					opacityTo: 0,
					stops: [0, 90, 100],
				},
			},
			grid: {
				borderColor: '#E3DFE7',
				strokeDashArray: 4,
				show: true,
				padding: {
					left: 20,
					right: 20,
					top: 0,
					bottom: 0,
				},
			},
		};

		let chart = new ApexCharts(document.querySelector('#CampaignReportDetails'), options);
		chart.render();

		const reportDetailsSeries = [
			{
				name: 'Delivered Cards',
				data: [
					700, 890, 905, 660, 708, 780, 840, 820, 980, 800, 750, 730, 700, 890, 905, 660, 708, 780, 840, 720, 780, 800, 750, 700, 600, 750, 780, 688, 855, 740, 599,
					552, 800, 750, 700,
				],
				color: '#219FFF',
			},
			{
				name: 'Engagement',
				data: [
					650, 850, 855, 600, 658, 780, 790, 670, 750, 750, 700, 680, 650, 850, 855, 630, 658, 720, 790, 670, 720, 750, 700, 750, 550, 700, 730, 640, 850, 690, 550,
					500, 750, 700, 650,
				],
				color:  '#632CC7',
			},
			{
				name: 'Direct Sales',
				data: [
					600, 700, 855, 560, 608, 680, 740, 620, 680, 700, 650, 630, 600, 790, 805, 560, 608, 680, 740, 620, 680, 700, 650, 600, 500, 650, 680, 588, 755, 640, 499,
					452, 700, 650, 600,
				],
				color: '#FFA114',
			},
			{
				name: 'Ad Spend',
				data: [
					500, 600, 705, 460, 650, 620, 640, 720, 780, 650, 660, 650, 580, 800, 855, 530, 608, 680, 640, 520, 780, 700, 750, 650, 400, 550, 580, 488, 655, 540, 399,
					552, 600, 550, 500,
				],
				color: '#FF4E3E',
			},
			{
				name: 'Attributed Sales',
				data: [
					400, 590, 605, 360, 408, 480, 540, 420, 480, 500, 450, 430, 400, 490, 405, 360, 408, 480, 540, 420, 480, 500, 450, 400, 300, 450, 480, 388, 555, 440, 299,
					452, 500, 450, 400,
				],
				color: '#17BD8D',
			},
			{
				name: 'Roas',
				data: [
					350, 490, 505,250, 358, 320, 600, 480, 520, 550, 500, 600, 550, 540, 455, 410, 458, 530, 600, 450, 530, 550, 400, 350, 250, 400, 430, 300, 600, 500, 350,
					602, 650, 700, 650,
				],
				color: '#FF7C42',
			},
			{
				name: 'Order',
				data: [
					450, 550, 655, 400, 458, 520, 600, 480, 520, 550, 500, 500, 450, 540, 455, 410, 458, 530, 600, 450, 530, 550, 500, 450, 350, 500, 530, 410, 600, 500, 350,
					502, 550, 500, 450,
				],
				color: '#FFA114',
			},
		];

		function chartInitChecked() {
			$('.btn-chartInit-toggle').each(function () {
				$('.apexcharts-legend.apexcharts-align-right').css({ left: 'initial', right: '175px' });
				let property = $(this).data('property');
				reportDetailsSeries.some((s) => {
					if (s.name === property) {
						chart.appendSeries(s);
						setTimeout(() => {
							$(this).hasClass('active') ? chart.showSeries(property) : chart.hideSeries(property);
							$('.apexcharts-legend-series.apexcharts-inactive-legend').addClass('d-none');
						}, 10);
					}
				});
			});
		}
		chartInitChecked();

		$('.btn-chartInit-toggle').on('click', function () {
			$(this).toggleClass('active');
			chart.toggleSeries($(this).data('property'));
			$('.apexcharts-legend.apexcharts-align-right').css({ left: 'initial', right: '175px' });
			$('.apexcharts-legend-series.apexcharts-inactive-legend').addClass('d-none');
		});
	});

});
