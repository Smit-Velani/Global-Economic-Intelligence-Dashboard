// ISO numeric to alpha-3 mapping (zero-padded)
const isoNumericToAlpha = {
    "004":"AFG","008":"ALB","012":"DZA","024":"AGO","032":"ARG",
    "036":"AUS","040":"AUT","050":"BGD","056":"BEL","068":"BOL",
    "076":"BRA","100":"BGR","116":"KHM","120":"CMR","124":"CAN",
    "144":"LKA","152":"CHL","156":"CHN","170":"COL","188":"CRI",
    "191":"HRV","192":"CUB","203":"CZE","208":"DNK","214":"DOM",
    "218":"ECU","818":"EGY","231":"ETH","246":"FIN","250":"FRA",
    "276":"DEU","288":"GHA","300":"GRC","320":"GTM","332":"HTI",
    "340":"HND","356":"IND","360":"IDN","364":"IRN","368":"IRQ",
    "372":"IRL","376":"ISR","380":"ITA","388":"JAM","392":"JPN",
    "400":"JOR","404":"KEN","410":"KOR","414":"KWT","418":"LAO",
    "422":"LBN","430":"LBR","434":"LBY","484":"MEX","504":"MAR",
    "508":"MOZ","516":"NAM","524":"NPL","528":"NLD","554":"NZL",
    "558":"NIC","566":"NGA","578":"NOR","586":"PAK","591":"PAN",
    "600":"PRY","604":"PER","608":"PHL","616":"POL","620":"PRT",
    "634":"QAT","642":"ROU","643":"RUS","682":"SAU","686":"SEN",
    "694":"SLE","706":"SOM","710":"ZAF","724":"ESP","729":"SDN",
    "752":"SWE","756":"CHE","760":"SYR","764":"THA","788":"TUN",
    "792":"TUR","800":"UGA","804":"UKR","784":"ARE","826":"GBR",
    "840":"USA","858":"URY","862":"VEN","704":"VNM","887":"YEM",
    "894":"ZMB","716":"ZWE","466":"MLI","478":"MRT","562":"NER",
    "740":"SUR","762":"TJK","795":"TKM","860":"UZB","548":"VUT",
    "104":"MMR","140":"CAF","178":"COG","180":"COD","174":"COM",
    "384":"CIV","262":"DJI","266":"GAB","324":"GIN","328":"GUY",
    "348":"HUN","352":"ISL","398":"KAZ","408":"PRK","417":"KGZ",
    "426":"LSO","440":"LTU","442":"LUX","450":"MDG","454":"MWI",
    "458":"MYS","462":"MDV","470":"MLT","480":"MUS","496":"MNG",
    "498":"MDA","512":"OMN","520":"NRU","304":"GRL","344":"HKG",
    "533":"ABW","540":"NCL","570":"NIU","598":"PNG","624":"GNB",
    "626":"TLS","630":"PRI","638":"REU","646":"RWA","688":"SRB",
    "690":"SYC","703":"SVK","705":"SVN","720":"YEM","728":"SSD",
    "732":"ESH","748":"SWZ","768":"TGO","776":"TON","780":"TTO",
    "798":"TUV","807":"MKD","831":"GGY","832":"JEY","834":"TZA",
    "850":"VIR","854":"BFA","882":"WSM","148":"TCD","072":"BWA",
    "064":"BTN","090":"SLB","096":"BRN","132":"CPV","196":"CYP",
    "204":"BEN","212":"DMA","222":"SLV","232":"ERI","233":"EST",
    "242":"FJI","268":"GEO","270":"GMB","296":"KIR","308":"GRD",
    "428":"LVA","438":"LIE","446":"MAC","492":"MCO","531":"CUW",
    "583":"FSM","584":"MHL","585":"PLW","659":"KNA","662":"LCA",
    "670":"VCT","674":"SMR","678":"STP","703":"SVK","728":"SSD"
};

// Global variables
let countriesData = {};
let currentCountryData = null;
let raceInterval = null;
let currentMetric = 'gdp';

// GDP Race Data
const raceData = {
    2000: {USA:10.25,JPN:4.89,DEU:1.95,GBR:1.66,FRA:1.37,CHN:1.21,ITA:1.14,CAN:0.74,BRA:0.65,MEX:0.68},
    2002: {USA:10.98,JPN:4.11,DEU:2.08,GBR:1.77,FRA:1.49,CHN:1.47,ITA:1.24,CAN:0.76,BRA:0.50,MEX:0.73},
    2004: {USA:12.27,JPN:4.65,DEU:2.81,GBR:2.37,FRA:2.13,CHN:1.96,ITA:1.80,CAN:1.02,BRA:0.66,MEX:0.77},
    2006: {USA:13.86,JPN:4.36,DEU:3.00,GBR:2.70,FRA:2.32,CHN:2.75,ITA:1.93,CAN:1.31,BRA:1.09,MEX:0.97},
    2008: {USA:14.72,JPN:5.04,DEU:3.75,GBR:2.92,FRA:2.92,CHN:4.60,ITA:2.40,CAN:1.55,BRA:1.70,MEX:1.11},
    2010: {USA:15.00,JPN:5.70,DEU:3.42,GBR:2.48,FRA:2.65,CHN:6.09,ITA:2.13,CAN:1.61,BRA:2.21,MEX:1.05},
    2012: {USA:16.16,JPN:6.20,DEU:3.54,GBR:2.66,FRA:2.68,CHN:8.53,ITA:2.09,CAN:1.82,BRA:2.46,MEX:1.20},
    2014: {USA:17.55,JPN:4.85,DEU:3.89,GBR:3.06,FRA:2.85,CHN:10.48,ITA:2.15,CAN:1.80,BRA:2.46,MEX:1.31},
    2016: {USA:18.75,JPN:4.93,DEU:3.48,GBR:2.65,FRA:2.47,CHN:11.23,ITA:1.86,CAN:1.53,BRA:1.80,IND:2.29},
    2018: {USA:20.58,JPN:4.95,DEU:3.99,GBR:2.86,FRA:2.78,CHN:13.89,ITA:2.09,CAN:1.71,BRA:1.92,IND:2.70},
    2020: {USA:21.06,JPN:5.04,DEU:3.88,GBR:2.70,FRA:2.63,CHN:14.72,ITA:1.90,CAN:1.64,BRA:1.44,IND:2.67},
    2022: {USA:25.46,JPN:4.23,DEU:4.08,GBR:3.07,FRA:2.78,CHN:17.96,ITA:2.05,CAN:2.14,BRA:1.92,IND:3.39},
    2024: {USA:28.75,JPN:4.11,DEU:4.46,GBR:3.34,FRA:3.13,CHN:18.53,ITA:2.38,CAN:2.24,BRA:2.17,IND:3.91}
};

const countryNames = {
    USA:"United States",JPN:"Japan",DEU:"Germany",GBR:"United Kingdom",
    FRA:"France",CHN:"China",ITA:"Italy",CAN:"Canada",BRA:"Brazil",
    MEX:"Mexico",IND:"India"
};

const raceColors = {
    USA:"#3B82F6",JPN:"#EF4444",DEU:"#F59E0B",GBR:"#8B5CF6",
    FRA:"#EC4899",CHN:"#EF4444",ITA:"#06B6D4",CAN:"#10B981",
    BRA:"#F97316",MEX:"#84CC16",IND:"#FF6B35"
};

// Format numbers
function formatNum(val, type) {
    if (val === null || val === undefined || isNaN(val)) return 'N/A';
    if (type === 'gdp') {
        if (val >= 1e12) return '$' + (val / 1e12).toFixed(2) + 'T';
        if (val >= 1e9) return '$' + (val / 1e9).toFixed(2) + 'B';
        return '$' + val.toFixed(2);
    }
    if (type === 'pop') {
        if (val >= 1e9) return (val / 1e9).toFixed(2) + 'B';
        if (val >= 1e6) return (val / 1e6).toFixed(2) + 'M';
        return val.toLocaleString();
    }
    if (type === 'pct') return val.toFixed(2) + '%';
    if (type === 'gdppc') return '$' + val.toLocaleString(undefined, {maximumFractionDigits: 0});
    return val;
}

// Populate dropdowns
function populateDropdowns(data) {
    const select1 = document.getElementById('country-select-1');
    const select2 = document.getElementById('country-select-2');
    const sorted = [...data].sort((a, b) => a.name.localeCompare(b.name));
    sorted.forEach(c => {
        const opt1 = document.createElement('option');
        opt1.value = c.country; opt1.textContent = c.name;
        select1.appendChild(opt1);
        const opt2 = document.createElement('option');
        opt2.value = c.country; opt2.textContent = c.name;
        select2.appendChild(opt2);
    });
}

// Search
function initSearch(data) {
    const input = document.getElementById('country-search');
    const results = document.getElementById('search-results');
    input.addEventListener('input', () => {
        const query = input.value.toLowerCase().trim();
        if (query.length < 2) { results.style.display = 'none'; return; }
        const matches = data.filter(c => c.name.toLowerCase().includes(query)).slice(0, 8);
        if (!matches.length) { results.style.display = 'none'; return; }
        results.style.display = 'block';
        results.innerHTML = matches.map(c =>
            `<div class="search-result-item" onclick="selectFromSearch('${c.country}')">${c.name}</div>`
        ).join('');
    });
    document.addEventListener('click', e => {
        if (!e.target.closest('.map-search')) results.style.display = 'none';
    });
}

function selectFromSearch(code) {
    const data = countriesData[code];
    if (data) {
        loadCountryDetail(code, data);
        document.getElementById('country-search').value = data.name;
        document.getElementById('search-results').style.display = 'none';
    }
}

// Metric toggle
let mapSvg = null;
let mapColorScale = null;
let mapData = null;

function switchMetric(metric) {
    currentMetric = metric;
    document.querySelectorAll('.metric-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    if (!mapSvg || !mapData) return;

    const values = mapData.map(d => d[metric]).filter(v => v && v > 0);
    if (!values.length) return;

    const colorScale = d3.scaleLog()
        .domain([d3.min(values), d3.max(values)])
        .range(['#1e3a5f', '#06b6d4'])
        .clamp(true);

    mapSvg.selectAll('.country').attr('fill', d => {
        const alphaCode = isoNumericToAlpha[String(d.id)];
        const match = alphaCode ? countriesData[alphaCode] : null;
        const val = match ? match[metric] : null;
        return val && val > 0 ? colorScale(val) : '#1F2937';
    });
}

// Draw map
async function drawMap() {
    const width = document.getElementById('world-map').clientWidth;
    const height = 500;

    const svg = d3.select('#world-map')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    mapSvg = svg;

    const projection = d3.geoNaturalEarth1()
        .scale(width / 6.5)
        .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    const world = await d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
    const countries = topojson.feature(world, world.objects.countries);

    const response = await fetch('/api/countries');
    const data = await response.json();
    if (!Array.isArray(data)) { console.error('API error:', data); return; }

    mapData = data;
    data.forEach(d => { countriesData[d.country] = d; });
    populateDropdowns(data);
    initSearch(data);

    const gdpValues = data.map(d => d.gdp).filter(Boolean);
    const colorScale = d3.scaleLog()
        .domain([d3.min(gdpValues), d3.max(gdpValues)])
        .range(['#1e3a5f', '#06b6d4'])
        .clamp(true);

    mapColorScale = colorScale;

    svg.selectAll('.country')
        .data(countries.features)
        .enter()
        .append('path')
        .attr('class', 'country')
        .attr('d', path)
        .attr('fill', d => {
            const alphaCode = isoNumericToAlpha[String(d.id)];
            const match = alphaCode ? countriesData[alphaCode] : null;
            return match && match.gdp ? colorScale(match.gdp) : '#1F2937';
        })
        .on('click', function(event, d) {
            svg.selectAll('.country').classed('selected', false);
            d3.select(this).classed('selected', true);
            const alphaCode = isoNumericToAlpha[String(d.id)];
            if (alphaCode && countriesData[alphaCode]) {
                loadCountryDetail(alphaCode, countriesData[alphaCode]);
            }
        })
        .append('title')
        .text(d => {
            const alphaCode = isoNumericToAlpha[String(d.id)];
            const match = alphaCode ? countriesData[alphaCode] : null;
            return match ? match.name : 'No data';
        });
}

// Load country detail
async function loadCountryDetail(code, basicData) {
    currentCountryData = { code, basicData };
    const panel = document.getElementById('country-panel');
    panel.style.display = 'block';

    document.getElementById('country-name').textContent = basicData.name || code;
    document.getElementById('ai-summary').textContent = 'Loading AI summary...';
    document.getElementById('stat-gdp').textContent = formatNum(basicData.gdp, 'gdp');
    document.getElementById('stat-gdppc').textContent = formatNum(basicData.gdp_per_capita, 'gdppc');
    document.getElementById('stat-pop').textContent = formatNum(basicData.population, 'pop');
    document.getElementById('stat-inf').textContent = formatNum(basicData.inflation, 'pct');
    document.getElementById('stat-unem').textContent = formatNum(basicData.unemployment, 'pct');
    document.getElementById('stat-growth').textContent = basicData.gdp_growth ? formatNum(basicData.gdp_growth, 'pct') : 'N/A';
    document.getElementById('stat-health').textContent = basicData.health_score !== null ? basicData.health_score + '/100' : 'N/A';
    document.getElementById('stat-sent').textContent = 'Loading...';
    document.getElementById('stat-currency').textContent = 'Loading...';
    document.getElementById('news-list').innerHTML = '';
    document.getElementById('forecast-chart').innerHTML = '';
    document.getElementById('health-gauge').innerHTML = '';

    // Draw health gauge immediately
    if (basicData.health_score !== null) {
        drawHealthGauge(basicData.health_score);
    }

    try {
        const response = await fetch(`/api/country/${code}`);
        const detail = await response.json();

        document.getElementById('ai-summary').textContent = detail.summary || 'No summary available';

        // Sentiment badge
        const badge = document.getElementById('sentiment-badge');
        const sent = detail.sentiment;
        if (sent) {
            badge.textContent = sent.label;
            badge.className = 'badge ' + sent.label.toLowerCase();
            document.getElementById('stat-sent').textContent = sent.score + ' (' + sent.label + ')';
        }

        // Risk badge
        const riskBadge = document.getElementById('risk-badge');
        if (detail.risk_rating) {
            const risk = detail.risk_rating.toLowerCase();
            riskBadge.textContent = 'Risk: ' + detail.risk_rating;
            riskBadge.className = 'badge ' + risk + '-risk';
        }

        // Currency
        if (detail.currency) {
            const curr = detail.currency;
            if (curr.rate) {
                document.getElementById('stat-currency').textContent =
                    `1 USD = ${curr.rate} ${curr.currency}`;
            } else {
                document.getElementById('stat-currency').textContent = curr.currency || 'N/A';
            }
        }

        // Forecast chart
        if (detail.forecast && detail.forecast.historical) {
            const hist = detail.forecast.historical;
            const pred = detail.forecast.forecast;
            Plotly.newPlot('forecast-chart', [
                { x: hist.map(d => d.year), y: hist.map(d => d.gdp), type: 'scatter', mode: 'lines+markers', name: 'Historical', line: { color: '#3B82F6', width: 2 }, marker: { size: 5 } },
                { x: pred.map(d => d.year), y: pred.map(d => d.gdp), type: 'scatter', mode: 'lines+markers', name: 'Forecast', line: { color: '#06B6D4', width: 2, dash: 'dot' }, marker: { size: 5 } }
            ], {
                paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
                font: { color: '#94A3B8', size: 11 },
                xaxis: { gridcolor: '#1F2937', title: 'Year' },
                yaxis: { gridcolor: '#1F2937', title: 'GDP (USD Billion)' },
                legend: { font: { color: '#94A3B8' } },
                margin: { t: 10, r: 10, b: 40, l: 60 }
            });
        }

        // News headlines
        const newsList = document.getElementById('news-list');
        if (sent && sent.headlines && sent.headlines.length > 0) {
            newsList.innerHTML = sent.headlines.map(h => {
                const cls = h.score > 0.05 ? 'pos' : h.score < -0.05 ? 'neg' : 'neu';
                const label = h.score > 0.05 ? 'Positive' : h.score < -0.05 ? 'Negative' : 'Neutral';
                return `<div class="news-item"><a href="${h.url}" target="_blank">${h.title}</a><div class="news-score ${cls}">Sentiment: ${label} (${h.score})</div></div>`;
            }).join('');
        } else {
            newsList.innerHTML = '<p class="loading">No headlines available</p>';
        }

    } catch(e) {
        document.getElementById('ai-summary').textContent = 'Error loading data';
        console.error(e);
    }

    panel.scrollIntoView({ behavior: 'smooth' });
}

// Health Gauge
function drawHealthGauge(score) {
    const color = score >= 70 ? '#10B981' : score >= 40 ? '#F59E0B' : '#EF4444';
    Plotly.newPlot('health-gauge', [{
        type: 'indicator',
        mode: 'gauge+number',
        value: score,
        gauge: {
            axis: { range: [0, 100], tickcolor: '#94A3B8' },
            bar: { color: color },
            bgcolor: 'transparent',
            bordercolor: '#1F2937',
            steps: [
                { range: [0, 40], color: 'rgba(239,68,68,0.1)' },
                { range: [40, 70], color: 'rgba(245,158,11,0.1)' },
                { range: [70, 100], color: 'rgba(16,185,129,0.1)' }
            ]
        },
        number: { font: { color: color, size: 28 }, suffix: '/100' }
    }], {
        paper_bgcolor: 'transparent',
        font: { color: '#94A3B8' },
        margin: { t: 20, r: 20, b: 20, l: 20 }
    });
}

// Download Report
function downloadReport() {
    if (!currentCountryData) return;
    const name = document.getElementById('country-name').textContent;
    const gdp = document.getElementById('stat-gdp').textContent;
    const gdppc = document.getElementById('stat-gdppc').textContent;
    const pop = document.getElementById('stat-pop').textContent;
    const inf = document.getElementById('stat-inf').textContent;
    const unem = document.getElementById('stat-unem').textContent;
    const sent = document.getElementById('stat-sent').textContent;
    const health = document.getElementById('stat-health').textContent;
    const currency = document.getElementById('stat-currency').textContent;
    const growth = document.getElementById('stat-growth').textContent;
    const summary = document.getElementById('ai-summary').textContent;
    const risk = document.getElementById('risk-badge').textContent;

    const content = `<html><head><title>${name} Economic Report</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 40px; color: #1a1a1a; }
        h1 { color: #2563EB; border-bottom: 2px solid #2563EB; padding-bottom: 10px; }
        h2 { color: #374151; margin-top: 20px; }
        .stat { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
        .val { font-weight: bold; color: #2563EB; }
        .summary { background: #f3f4f6; padding: 15px; border-radius: 8px; margin-top: 10px; line-height: 1.6; }
        .footer { margin-top: 40px; color: #9ca3af; font-size: 12px; }
    </style></head>
    <body>
        <h1>${name} — Economic Report 2026</h1>
        <p style="color:#6b7280">Generated by Global Economic Intelligence Dashboard · Powered by Groq LLaMA</p>
        <h2>Key Economic Indicators</h2>
        <div class="stat"><span>GDP</span><span class="val">${gdp}</span></div>
        <div class="stat"><span>GDP Per Capita</span><span class="val">${gdppc}</span></div>
        <div class="stat"><span>GDP Growth</span><span class="val">${growth}</span></div>
        <div class="stat"><span>Population</span><span class="val">${pop}</span></div>
        <div class="stat"><span>Inflation</span><span class="val">${inf}</span></div>
        <div class="stat"><span>Unemployment</span><span class="val">${unem}</span></div>
        <div class="stat"><span>Currency vs USD</span><span class="val">${currency}</span></div>
        <div class="stat"><span>Economic Health Score</span><span class="val">${health}</span></div>
        <div class="stat"><span>News Sentiment</span><span class="val">${sent}</span></div>
        <div class="stat"><span>Investor Risk Rating</span><span class="val">${risk}</span></div>
        <h2>AI Economic Summary</h2>
        <div class="summary">${summary}</div>
        <div class="footer"><p>Data Source: World Bank API | Built by Smitkumar Velani | smit-velani.github.io</p></div>
    </body></html>`;

    const win = window.open('', '_blank');
    win.document.write(content);
    win.document.close();
    win.print();
}

// Load anomalies
async function loadAnomalies() {
    try {
        const response = await fetch('/api/anomalies');
        const data = await response.json();
        const badge = document.getElementById('anomaly-count');
        const list = document.getElementById('anomaly-list');
        if (data.anomalies) {
            badge.textContent = data.anomaly_count + ' anomalies detected';
            list.innerHTML = data.anomalies.map(a => `
                <div class="anomaly-item">
                    <span>${a.country}</span>
                    <span class="anomaly-val">${a.gdp_growth.toFixed(2)}% GDP growth</span>
                </div>`).join('');
        } else {
            list.innerHTML = '<p class="loading">Could not load anomalies</p>';
        }
    } catch(e) { console.error(e); }
}

// Load Top 10
async function loadTop10() {
    try {
        const response = await fetch('/api/top10');
        const data = await response.json();
        const list = document.getElementById('top10-list');
        if (Array.isArray(data)) {
            list.innerHTML = data.map((c, i) => `
                <div class="top10-item">
                    <div class="top10-rank">${i + 1}</div>
                    <span class="top10-name">${c.name}</span>
                    <span class="top10-val">${formatNum(c.gdp_per_capita, 'gdppc')}</span>
                </div>`).join('');
        } else {
            list.innerHTML = '<p class="loading">Could not load data</p>';
        }
    } catch(e) { console.error(e); }
}

// GDP Bar Chart Race
function drawRaceFrame(year) {
    const yearData = raceData[year];
    if (!yearData) return;
    document.getElementById('race-year').textContent = year;
    const sorted = Object.entries(yearData).sort((a, b) => b[1] - a[1]).slice(0, 10);
    Plotly.react('race-chart', [{
        type: 'bar', orientation: 'h',
        x: sorted.map(d => d[1]),
        y: sorted.map(d => countryNames[d[0]] || d[0]),
        marker: { color: sorted.map(d => raceColors[d[0]] || '#3B82F6') },
        text: sorted.map(d => '$' + d[1].toFixed(2) + 'T'),
        textposition: 'outside',
        textfont: { color: '#94A3B8', size: 11 }
    }], {
        paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
        font: { color: '#94A3B8' },
        xaxis: { gridcolor: '#1F2937', title: 'GDP (USD Trillion)', color: '#94A3B8' },
        yaxis: { color: '#94A3B8', autorange: 'reversed' },
        margin: { t: 10, r: 80, b: 40, l: 140 },
        transition: { duration: 500, easing: 'cubic-in-out' }
    });
}

function startRace() {
    if (raceInterval) clearInterval(raceInterval);
    const years = Object.keys(raceData).map(Number).sort();
    let idx = 0;
    drawRaceFrame(years[idx]);
    raceInterval = setInterval(() => {
        idx++;
        if (idx >= years.length) { clearInterval(raceInterval); return; }
        drawRaceFrame(years[idx]);
    }, 1200);
}

function resetRace() {
    if (raceInterval) clearInterval(raceInterval);
    drawRaceFrame(2000);
}

// Country comparison
document.getElementById('compare-btn').addEventListener('click', () => {
    const code1 = document.getElementById('country-select-1').value;
    const code2 = document.getElementById('country-select-2').value;
    if (!code1 || !code2) { alert('Please select both countries'); return; }
    if (code1 === code2) { alert('Please select two different countries'); return; }

    const c1 = countriesData[code1];
    const c2 = countriesData[code2];
    document.getElementById('comparison-result').style.display = 'block';

    const maxGdpPc = Math.max(c1.gdp_per_capita || 0, c2.gdp_per_capita || 0);
    const maxInf = Math.max(c1.inflation || 0, c2.inflation || 0);
    const maxUnem = Math.max(c1.unemployment || 0, c2.unemployment || 0);
    const maxHealth = Math.max(c1.health_score || 0, c2.health_score || 0);
    const normalize = (val, max) => max > 0 ? (val || 0) / max * 100 : 0;

    const metrics = ['GDP Per Capita', 'Health Score', 'Inflation', 'Unemployment'];
    const vals1 = [normalize(c1.gdp_per_capita, maxGdpPc), normalize(c1.health_score, maxHealth), normalize(c1.inflation, maxInf), normalize(c1.unemployment, maxUnem)];
    const vals2 = [normalize(c2.gdp_per_capita, maxGdpPc), normalize(c2.health_score, maxHealth), normalize(c2.inflation, maxInf), normalize(c2.unemployment, maxUnem)];

    Plotly.newPlot('radar-chart', [
        { type: 'scatterpolar', r: vals1, theta: metrics, fill: 'toself', name: c1.name, line: { color: '#3B82F6' }, fillcolor: 'rgba(59,130,246,0.2)' },
        { type: 'scatterpolar', r: vals2, theta: metrics, fill: 'toself', name: c2.name, line: { color: '#06B6D4' }, fillcolor: 'rgba(6,182,212,0.2)' }
    ], {
        polar: { radialaxis: { visible: true, range: [0, 100], gridcolor: '#1F2937', color: '#94A3B8' }, bgcolor: 'transparent' },
        paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
        font: { color: '#94A3B8' }, legend: { font: { color: '#94A3B8' } },
        margin: { t: 40, r: 40, b: 40, l: 40 }
    });

    document.getElementById('comparison-stats').innerHTML = `
        <div class="comparison-stat-card">
            <h3>${c1.name}</h3>
            <div class="comparison-row"><span class="label">GDP</span><span class="val ${(c1.gdp||0)>=(c2.gdp||0)?'winner':''}">${formatNum(c1.gdp,'gdp')}</span></div>
            <div class="comparison-row"><span class="label">GDP Per Capita</span><span class="val ${(c1.gdp_per_capita||0)>=(c2.gdp_per_capita||0)?'winner':''}">${formatNum(c1.gdp_per_capita,'gdppc')}</span></div>
            <div class="comparison-row"><span class="label">Health Score</span><span class="val ${(c1.health_score||0)>=(c2.health_score||0)?'winner':''}">${c1.health_score || 'N/A'}/100</span></div>
            <div class="comparison-row"><span class="label">Population</span><span class="val">${formatNum(c1.population,'pop')}</span></div>
            <div class="comparison-row"><span class="label">Inflation</span><span class="val ${(c1.inflation||0)<=(c2.inflation||0)?'winner':''}">${formatNum(c1.inflation,'pct')}</span></div>
            <div class="comparison-row"><span class="label">Unemployment</span><span class="val ${(c1.unemployment||0)<=(c2.unemployment||0)?'winner':''}">${formatNum(c1.unemployment,'pct')}</span></div>
        </div>
        <div class="comparison-stat-card">
            <h3>${c2.name}</h3>
            <div class="comparison-row"><span class="label">GDP</span><span class="val ${(c2.gdp||0)>=(c1.gdp||0)?'winner':''}">${formatNum(c2.gdp,'gdp')}</span></div>
            <div class="comparison-row"><span class="label">GDP Per Capita</span><span class="val ${(c2.gdp_per_capita||0)>=(c1.gdp_per_capita||0)?'winner':''}">${formatNum(c2.gdp_per_capita,'gdppc')}</span></div>
            <div class="comparison-row"><span class="label">Health Score</span><span class="val ${(c2.health_score||0)>=(c1.health_score||0)?'winner':''}">${c2.health_score || 'N/A'}/100</span></div>
            <div class="comparison-row"><span class="label">Population</span><span class="val">${formatNum(c2.population,'pop')}</span></div>
            <div class="comparison-row"><span class="label">Inflation</span><span class="val ${(c2.inflation||0)<=(c1.inflation||0)?'winner':''}">${formatNum(c2.inflation,'pct')}</span></div>
            <div class="comparison-row"><span class="label">Unemployment</span><span class="val ${(c2.unemployment||0)<=(c1.unemployment||0)?'winner':''}">${formatNum(c2.unemployment,'pct')}</span></div>
        </div>`;

    document.getElementById('comparison').scrollIntoView({ behavior: 'smooth' });
});

// Initialize
drawMap();
loadAnomalies();
loadTop10();
drawRaceFrame(2000);