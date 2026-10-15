// ISO numeric to alpha-3 mapping
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

// Global state
let countriesData = {};
let currentCountryData = null;
let raceInterval = null;
let currentMetric = 'gdp';
let mapSvg = null;
let mapAllData = null;

// GDP Race data
const raceData = {
    2000:{USA:10.25,JPN:4.89,DEU:1.95,GBR:1.66,FRA:1.37,CHN:1.21,ITA:1.14,CAN:0.74,BRA:0.65,MEX:0.68},
    2002:{USA:10.98,JPN:4.11,DEU:2.08,GBR:1.77,FRA:1.49,CHN:1.47,ITA:1.24,CAN:0.76,BRA:0.50,MEX:0.73},
    2004:{USA:12.27,JPN:4.65,DEU:2.81,GBR:2.37,FRA:2.13,CHN:1.96,ITA:1.80,CAN:1.02,BRA:0.66,MEX:0.77},
    2006:{USA:13.86,JPN:4.36,DEU:3.00,GBR:2.70,FRA:2.32,CHN:2.75,ITA:1.93,CAN:1.31,BRA:1.09,MEX:0.97},
    2008:{USA:14.72,JPN:5.04,DEU:3.75,GBR:2.92,FRA:2.92,CHN:4.60,ITA:2.40,CAN:1.55,BRA:1.70,MEX:1.11},
    2010:{USA:15.00,JPN:5.70,DEU:3.42,GBR:2.48,FRA:2.65,CHN:6.09,ITA:2.13,CAN:1.61,BRA:2.21,MEX:1.05},
    2012:{USA:16.16,JPN:6.20,DEU:3.54,GBR:2.66,FRA:2.68,CHN:8.53,ITA:2.09,CAN:1.82,BRA:2.46,MEX:1.20},
    2014:{USA:17.55,JPN:4.85,DEU:3.89,GBR:3.06,FRA:2.85,CHN:10.48,ITA:2.15,CAN:1.80,BRA:2.46,MEX:1.31},
    2016:{USA:18.75,JPN:4.93,DEU:3.48,GBR:2.65,FRA:2.47,CHN:11.23,ITA:1.86,CAN:1.53,BRA:1.80,IND:2.29},
    2018:{USA:20.58,JPN:4.95,DEU:3.99,GBR:2.86,FRA:2.78,CHN:13.89,ITA:2.09,CAN:1.71,BRA:1.92,IND:2.70},
    2020:{USA:21.06,JPN:5.04,DEU:3.88,GBR:2.70,FRA:2.63,CHN:14.72,ITA:1.90,CAN:1.64,BRA:1.44,IND:2.67},
    2022:{USA:25.46,JPN:4.23,DEU:4.08,GBR:3.07,FRA:2.78,CHN:17.96,ITA:2.05,CAN:2.14,BRA:1.92,IND:3.39},
    2024:{USA:28.75,JPN:4.11,DEU:4.46,GBR:3.34,FRA:3.13,CHN:18.53,ITA:2.38,CAN:2.24,BRA:2.17,IND:3.91}
};

const countryNames = {
    USA:"United States",JPN:"Japan",DEU:"Germany",GBR:"United Kingdom",
    FRA:"France",CHN:"China",ITA:"Italy",CAN:"Canada",BRA:"Brazil",
    MEX:"Mexico",IND:"India"
};

const raceColors = {
    USA:"#6366F1",JPN:"#F43F5E",DEU:"#F59E0B",GBR:"#8B5CF6",
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

// WebSocket
const socket = io();

socket.on('connect', () => {
    document.getElementById('live-label').textContent = 'Live';
    document.getElementById('live-label').style.color = '#10B981';
});

socket.on('disconnect', () => {
    document.getElementById('live-label').textContent = 'Offline';
    document.getElementById('live-label').style.color = '#F43F5E';
});

socket.on('data_refreshed', (data) => {
    document.getElementById('last-updated').textContent = `Updated ${data.time}`;
    // Re-fetch map data
    fetch('/api/countries').then(r => r.json()).then(newData => {
        if (Array.isArray(newData)) {
            newData.forEach(d => { countriesData[d.country] = d; });
            mapAllData = newData;
            refreshMapColors();
        }
    });
});

// Populate dropdowns
function populateDropdowns(data) {
    const s1 = document.getElementById('country-select-1');
    const s2 = document.getElementById('country-select-2');
    const sorted = [...data].sort((a, b) => a.name.localeCompare(b.name));
    sorted.forEach(c => {
        [s1, s2].forEach(sel => {
            const opt = document.createElement('option');
            opt.value = c.country; opt.textContent = c.name;
            sel.appendChild(opt);
        });
    });
}

// Search
function initSearch(data) {
    const input = document.getElementById('country-search');
    const results = document.getElementById('search-results');
    input.addEventListener('input', () => {
        const q = input.value.toLowerCase().trim();
        if (q.length < 2) { results.style.display = 'none'; return; }
        const matches = data.filter(c => c.name.toLowerCase().includes(q)).slice(0, 8);
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
function switchMetric(metric, event) {
    currentMetric = metric;
    document.querySelectorAll('.metric-btn').forEach(b => b.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');
    refreshMapColors();
}

function refreshMapColors() {
    if (!mapSvg || !mapAllData) return;

    const values = mapAllData
        .map(d => Number(d[currentMetric]))
        .filter(v => Number.isFinite(v));

    if (!values.length) return;

    const minValue = d3.min(values);
    const maxValue = d3.max(values);

    let colorScale;

    if (currentMetric === 'inflation') {
        const bound = Math.max(
            Math.abs(minValue),
            Math.abs(maxValue),
            1
        );

        colorScale = d3.scaleDiverging()
            .domain([-bound, 0, bound])
            .interpolator(d3.interpolateRdBu)
            .clamp(true);

    } else {
        colorScale = d3.scaleSequential()
            .domain([
                minValue,
                maxValue > minValue ? maxValue : minValue + 1
            ])
            .interpolator(d3.interpolateBlues)
            .clamp(true);
    }

    mapSvg.selectAll('.country')
        .attr('fill', d => {
            const code = isoNumericToAlpha[String(d.id)];
            const match = code ? countriesData[code] : null;
            const value = match ? match[currentMetric] : null;

            if (value === null || value === undefined) {
                return '#CBD5E1';
            }

            const number = Number(value);

            return Number.isFinite(number)
                ? colorScale(number)
                : '#CBD5E1';
        });
}

// Draw map

async function drawMap() {
    const width = document.getElementById('world-map').clientWidth;
    const height = 480;

    const svg = d3.select('#world-map').append('svg')
        .attr('width', width).attr('height', height);
    mapSvg = svg;

    const projection = d3.geoNaturalEarth1()
        .scale(width / 6.5).translate([width / 2, height / 2]);
    const path = d3.geoPath().projection(projection);

    const world = await d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
    const countries = topojson.feature(world, world.objects.countries);

    const response = await fetch('/api/countries');
    const data = await response.json();
    if (!Array.isArray(data)) { console.error('API error:', data); return; }

    mapAllData = data;
    data.forEach(d => { countriesData[d.country] = d; });
    populateDropdowns(data);
    initSearch(data);

    const gdpValues = data.map(d => d.gdp).filter(Boolean);
    const colorScale = d3.scaleLog()
        .domain([d3.min(gdpValues), d3.max(gdpValues)])
        .range(['#0A1020', '#6366F1'])
        .clamp(true);

    svg.selectAll('.country')
        .data(countries.features).enter()
        .append('path')
        .attr('class', 'country').attr('d', path)
        .attr('fill', d => {
            const code = isoNumericToAlpha[String(d.id)];
            const match = code ? countriesData[code] : null;
            return match && match.gdp ? colorScale(match.gdp) : '#0D1117';
        })
        .on('click', function(event, d) {
            svg.selectAll('.country').classed('selected', false);
            d3.select(this).classed('selected', true);
            const code = isoNumericToAlpha[String(d.id)];
            if (code && countriesData[code]) loadCountryDetail(code, countriesData[code]);
        })
        .append('title')
        .text(d => {
            const code = isoNumericToAlpha[String(d.id)];
            return code && countriesData[code] ? countriesData[code].name : 'No data';
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
    document.getElementById('stat-health').textContent = basicData.health_score != null ? basicData.health_score + '/100' : 'N/A';
    document.getElementById('stat-sent').textContent = 'Loading...';
    document.getElementById('stat-currency').textContent = 'Loading...';
    document.getElementById('similar-countries').innerHTML = '<p class="loading">Running K-Means clustering...</p>';
    document.getElementById('news-list').innerHTML = '';
    document.getElementById('forecast-chart').innerHTML = '';
    document.getElementById('recession-factors').innerHTML = '';

    if (basicData.health_score != null) drawHealthGauge(basicData.health_score);

    try {
        const response = await fetch(`/api/country/${code}`);
        const detail = await response.json();

        // AI Summary
        document.getElementById('ai-summary').textContent = detail.summary || 'No summary available';

        // Sentiment
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
            riskBadge.textContent = 'Risk: ' + detail.risk_rating;
            riskBadge.className = 'badge ' + detail.risk_rating.toLowerCase() + '-risk';
        }

        // Currency
        if (detail.currency && detail.currency.rate) {
            document.getElementById('stat-currency').textContent = `1 USD = ${detail.currency.rate} ${detail.currency.currency}`;
        } else if (detail.currency) {
            document.getElementById('stat-currency').textContent = detail.currency.currency || 'N/A';
        }

        // Recession
        if (detail.recession) {
            const rec = detail.recession;
            const bar = document.getElementById('recession-bar');
            const prob = rec.probability;
            const color = prob >= 60 ? '#F43F5E' : prob >= 35 ? '#F59E0B' : '#10B981';
            bar.style.width = prob + '%';
            bar.style.background = `linear-gradient(90deg, ${color}88, ${color})`;
            document.getElementById('recession-prob').textContent = prob + '% probability';
            document.getElementById('recession-prob').style.color = color;
            const levelEl = document.getElementById('recession-level');
            levelEl.textContent = rec.level + ' Risk';
            levelEl.style.background = color + '20';
            levelEl.style.color = color;
            levelEl.style.border = `1px solid ${color}40`;
            levelEl.style.borderRadius = '100px';
            levelEl.style.padding = '0.15rem 0.6rem';
            if (rec.factors && rec.factors.length > 0) {
                document.getElementById('recession-factors').innerHTML = rec.factors.map(f =>
                    `<div class="recession-factor">${f}</div>`
                ).join('');
            }
        }

        // Similar countries
        if (detail.similar_countries && detail.similar_countries.similar && detail.similar_countries.similar.length > 0) {
            document.getElementById('similar-countries').innerHTML =
                detail.similar_countries.similar.map(c => `
                    <div class="similar-chip" onclick="selectFromSearch('${c.country}')">
                        ${c.name}
                        <span>GDP/cap: ${formatNum(c.gdp_per_capita, 'gdppc')} · Growth: ${c.gdp_growth != null ? c.gdp_growth.toFixed(1) + '%' : 'N/A'}</span>
                    </div>`
                ).join('');
        } else {
            document.getElementById('similar-countries').innerHTML = '<p class="loading">No similar countries found</p>';
        }

        // Forecast chart
        if (detail.forecast && detail.forecast.historical) {
            const hist = detail.forecast.historical;
            const pred = detail.forecast.forecast;
            Plotly.newPlot('forecast-chart', [
                { x: hist.map(d => d.year), y: hist.map(d => d.gdp), type: 'scatter', mode: 'lines+markers', name: 'Historical', line: { color: '#6366F1', width: 2 }, marker: { size: 4, color: '#6366F1' } },
                { x: pred.map(d => d.year), y: pred.map(d => d.gdp), type: 'scatter', mode: 'lines+markers', name: 'Forecast', line: { color: '#06B6D4', width: 2, dash: 'dot' }, marker: { size: 4, color: '#06B6D4' } }
            ], {
                paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
                font: { color: '#8892A4', size: 10 },
                xaxis: { gridcolor: '#161B27', title: 'Year', color: '#8892A4', zeroline: false },
                yaxis: { gridcolor: '#161B27', title: 'GDP (USD Billion)', color: '#8892A4', zeroline: false },
                legend: { font: { color: '#8892A4' } },
                margin: { t: 10, r: 10, b: 40, l: 60 }
            });
        }

        // News
        const newsList = document.getElementById('news-list');
        if (sent && sent.headlines && sent.headlines.length > 0) {
            newsList.innerHTML = sent.headlines.map(h => {
                const cls = h.score > 0.05 ? 'pos' : h.score < -0.05 ? 'neg' : 'neu';
                const label = h.score > 0.05 ? 'Positive' : h.score < -0.05 ? 'Negative' : 'Neutral';
                return `<div class="news-item"><a href="${h.url}" target="_blank">${h.title}</a><div class="news-score ${cls}">${label} · ${h.score}</div></div>`;
            }).join('');
        } else {
            newsList.innerHTML = '<p class="loading">No headlines available</p>';
        }

    } catch(e) {
        document.getElementById('ai-summary').textContent = 'Error loading data: ' + e.message;
    }

    panel.scrollIntoView({ behavior: 'smooth' });
}

// Health Gauge
function drawHealthGauge(score) {
    const color = score >= 70 ? '#10B981' : score >= 40 ? '#F59E0B' : '#F43F5E';
    Plotly.newPlot('health-gauge', [{
        type: 'indicator', mode: 'gauge+number',
        value: score,
        gauge: {
            axis: { range: [0, 100], tickcolor: '#8892A4', tickfont: { size: 9 } },
            bar: { color: color, thickness: 0.25 },
            bgcolor: 'transparent', bordercolor: '#161B27',
            steps: [
                { range: [0, 40], color: 'rgba(244,63,94,0.06)' },
                { range: [40, 70], color: 'rgba(245,158,11,0.06)' },
                { range: [70, 100], color: 'rgba(16,185,129,0.06)' }
            ],
            threshold: { line: { color: color, width: 3 }, thickness: 0.75, value: score }
        },
        number: { font: { color: color, size: 24 }, suffix: '/100' }
    }], {
        paper_bgcolor: 'transparent', font: { color: '#8892A4' },
        margin: { t: 15, r: 20, b: 15, l: 20 }
    });
}

// Download Report
function downloadReport() {
    if (!currentCountryData) return;
    const get = id => document.getElementById(id).textContent;
    const content = `<html><head><meta charset="UTF-8"><title>${get('country-name')} — Economic Report</title>
    <style>
        body{font-family:Arial,sans-serif;padding:40px;color:#111;max-width:800px;margin:0 auto}
        h1{color:#6366F1;border-bottom:3px solid #6366F1;padding-bottom:12px;margin-bottom:24px}
        h2{color:#374151;margin:24px 0 12px;font-size:1rem;text-transform:uppercase;letter-spacing:0.06em}
        .stat{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f3f4f6}
        .val{font-weight:700;color:#6366F1}
        .summary{background:#f8f9ff;border-left:4px solid #6366F1;padding:16px;border-radius:4px;line-height:1.7;margin:8px 0}
        .footer{margin-top:40px;color:#9ca3af;font-size:11px;text-align:center;border-top:1px solid #f3f4f6;padding-top:16px}
        .badge{display:inline-block;padding:3px 10px;border-radius:100px;font-size:11px;font-weight:700;background:#f0f0ff;color:#6366F1}
    </style></head><body>
    <h1>${get('country-name')} · Economic Intelligence Report</h1>
    <p style="color:#6b7280;margin-bottom:20px">Generated by Global Economic Intelligence Dashboard · ${new Date().toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'})}</p>
    <h2>Economic Indicators</h2>
    <div class="stat"><span>GDP (Total)</span><span class="val">${get('stat-gdp')}</span></div>
    <div class="stat"><span>GDP Per Capita</span><span class="val">${get('stat-gdppc')}</span></div>
    <div class="stat"><span>GDP Growth Rate</span><span class="val">${get('stat-growth')}</span></div>
    <div class="stat"><span>Population</span><span class="val">${get('stat-pop')}</span></div>
    <div class="stat"><span>Inflation Rate</span><span class="val">${get('stat-inf')}</span></div>
    <div class="stat"><span>Unemployment Rate</span><span class="val">${get('stat-unem')}</span></div>
    <div class="stat"><span>Currency vs USD</span><span class="val">${get('stat-currency')}</span></div>
    <div class="stat"><span>Economic Health Score</span><span class="val">${get('stat-health')}</span></div>
    <div class="stat"><span>News Sentiment</span><span class="val">${get('stat-sent')}</span></div>
    <div class="stat"><span>Economic Risk Indicator</span><span class="val">${get('risk-badge')}</span></div>
    <h2>AI Economic Summary</h2>
    <div class="summary">${get('ai-summary')}</div>
    <div class="footer">Data: World Bank API · AI: Groq LLaMA 3.3 · Built by Smitkumar Velani · smit-velani.github.io</div>
    </body></html>`;
    const win = window.open('', '_blank');
    win.document.write(content);
    win.document.close();
    win.print();
}

// Top 10
async function loadTop10() {
    try {
        const data = await fetch('/api/top10').then(r => r.json());
        const list = document.getElementById('top10-list');
        if (Array.isArray(data)) {
            list.innerHTML = data.map((c, i) => `
                <div class="top10-item">
                    <div class="top10-rank">${i + 1}</div>
                    <span class="top10-name">${c.name}</span>
                    <span class="top10-val">${formatNum(c.gdp_per_capita, 'gdppc')}</span>
                </div>`).join('');
        }
    } catch(e) { console.error(e); }
}

// GDP Race
function drawRaceFrame(year) {
    const yearData = raceData[year];
    if (!yearData) return;
    document.getElementById('race-year').textContent = year;
    const sorted = Object.entries(yearData).sort((a, b) => b[1] - a[1]).slice(0, 10);
    Plotly.react('race-chart', [{
        type: 'bar', orientation: 'h',
        x: sorted.map(d => d[1]),
        y: sorted.map(d => countryNames[d[0]] || d[0]),
        marker: { color: sorted.map(d => raceColors[d[0]] || '#6366F1'), opacity: 0.9 },
        text: sorted.map(d => '$' + d[1].toFixed(2) + 'T'),
        textposition: 'outside',
        textfont: { color: '#8892A4', size: 10 }
    }], {
        paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
        font: { color: '#8892A4' },
        xaxis: { gridcolor: '#161B27', title: 'GDP (USD Trillion)', color: '#8892A4', zeroline: false },
        yaxis: { color: '#8892A4', autorange: 'reversed', zeroline: false },
        margin: { t: 10, r: 90, b: 40, l: 150 },
        transition: { duration: 600, easing: 'cubic-in-out' }
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
    const maxH = Math.max(c1.health_score || 0, c2.health_score || 0);
    const norm = (v, m) => m > 0 ? (v || 0) / m * 100 : 0;

    const metrics = ['GDP Per Capita', 'Health Score', 'Low Inflation', 'Low Unemployment'];
    const maxInflation = Math.max(c1.inflation || 0, c2.inflation || 0);
    const vals1 = [norm(c1.gdp_per_capita, maxGdpPc), norm(c1.health_score, maxH), 100 - norm(c1.inflation, maxInflation), 100 - norm(c1.unemployment, maxUnem)];
    const vals2 = [norm(c2.gdp_per_capita, maxGdpPc), norm(c2.health_score, maxH), 100 - norm(c2.inflation, maxInflation), 100 - norm(c2.unemployment, maxUnem)];

    Plotly.newPlot('radar-chart', [
        { type: 'scatterpolar', r: vals1, theta: metrics, fill: 'toself', name: c1.name, line: { color: '#6366F1' }, fillcolor: 'rgba(99,102,241,0.18)' },
        { type: 'scatterpolar', r: vals2, theta: metrics, fill: 'toself', name: c2.name, line: { color: '#06B6D4' }, fillcolor: 'rgba(6,182,212,0.18)' }
    ], {
        polar: { radialaxis: { visible: true, range: [0, 100], gridcolor: '#161B27', color: '#8892A4', tickfont: { size: 9 } }, bgcolor: 'transparent', angularaxis: { color: '#8892A4' } },
        paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
        font: { color: '#8892A4' }, legend: { font: { color: '#8892A4' } },
        margin: { t: 40, r: 40, b: 40, l: 40 }
    });

    document.getElementById('comparison-stats').innerHTML = `
        <div class="comparison-stat-card">
            <h3>${c1.name}</h3>
            <div class="comparison-row"><span class="label">GDP</span><span class="val ${(c1.gdp||0)>=(c2.gdp||0)?'winner':''}">${formatNum(c1.gdp,'gdp')}</span></div>
            <div class="comparison-row"><span class="label">GDP Per Capita</span><span class="val ${(c1.gdp_per_capita||0)>=(c2.gdp_per_capita||0)?'winner':''}">${formatNum(c1.gdp_per_capita,'gdppc')}</span></div>
            <div class="comparison-row"><span class="label">Health Score</span><span class="val ${(c1.health_score||0)>=(c2.health_score||0)?'winner':''}">${c1.health_score||'N/A'}/100</span></div>
            <div class="comparison-row"><span class="label">Inflation</span><span class="val ${(c1.inflation||0)<=(c2.inflation||0)?'winner':''}">${formatNum(c1.inflation,'pct')}</span></div>
            <div class="comparison-row"><span class="label">Unemployment</span><span class="val ${(c1.unemployment||0)<=(c2.unemployment||0)?'winner':''}">${formatNum(c1.unemployment,'pct')}</span></div>
        </div>
        <div class="comparison-stat-card">
            <h3>${c2.name}</h3>
            <div class="comparison-row"><span class="label">GDP</span><span class="val ${(c2.gdp||0)>=(c1.gdp||0)?'winner':''}">${formatNum(c2.gdp,'gdp')}</span></div>
            <div class="comparison-row"><span class="label">GDP Per Capita</span><span class="val ${(c2.gdp_per_capita||0)>=(c1.gdp_per_capita||0)?'winner':''}">${formatNum(c2.gdp_per_capita,'gdppc')}</span></div>
            <div class="comparison-row"><span class="label">Health Score</span><span class="val ${(c2.health_score||0)>=(c1.health_score||0)?'winner':''}">${c2.health_score||'N/A'}/100</span></div>
            <div class="comparison-row"><span class="label">Inflation</span><span class="val ${(c2.inflation||0)<=(c1.inflation||0)?'winner':''}">${formatNum(c2.inflation,'pct')}</span></div>
            <div class="comparison-row"><span class="label">Unemployment</span><span class="val ${(c2.unemployment||0)<=(c1.unemployment||0)?'winner':''}">${formatNum(c2.unemployment,'pct')}</span></div>
        </div>`;

    document.getElementById('comparison').scrollIntoView({ behavior: 'smooth' });
});

// Initialize
drawMap();
loadTop10();
drawRaceFrame(2000);
