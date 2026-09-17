
let lat = 51.2465
let lon = 22.5684

const status = document.getElementById("status")

function dane() {

    fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=pm10,pm2_5,european_aqi`)
        .then(r => r.json())
        .then(d => {
            document.getElementById("pm25").innerText = d.current.pm2_5
            document.getElementById("pm10").innerText = d.current.pm10
            document.getElementById("jakopowie").innerText = d.current.european_aqi

            if (d.current.european_aqi <= 20) {
                status.innerText = "BARDZO DOBRA"
            } else if (d.current.european_aqi <= 40) {
                status.innerText = "DOBRA"
            } else if (d.current.european_aqi <= 60) {
                status.innerText = "UMIARKOWANA"
            } else if (d.current.european_aqi <= 80) {
                status.innerText = "ZŁA"
            } else {
                status.innerText = "BARDZO ZŁA"
            }
        })
        .catch(() => {
            status.innerText = "BRAK DANYCH"
        })

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`)
        .then(r => r.json())
        .then(d => {

            document.getElementById("temp").innerText = d.current.temperature_2m
            document.getElementById("wilgotnosc").innerText = d.current.relative_humidity_2m
            document.getElementById("wiatr").innerText = d.current.wind_speed_10m
            document.getElementById("aktualizacja").innerText = "● Dane zostały zaktualizowane"
        })
        .catch(() => {
            document.getElementById("aktualizacja").innerText = "● Błąd aktualizacji danych"
        })

}


function ustawLublin() {
    lat = 51.2465
    lon = 22.5684
    document.getElementById("miasto").innerText = "📍 LUBLIN, POLSKA"
    dane()
}


function mojaLokalizacja() {
    if (!navigator.geolocation) {
        document.getElementById("miasto").innerText = "📍 LOKALIZACJA NIEDOSTĘPNA"
        return
    }

    navigator.geolocation.getCurrentPosition(

        p => {
            lat = p.coords.latitude
            lon = p.coords.longitude
            document.getElementById("miasto").innerText = "📍 TWOJA LOKALIZACJA"
            dane()
        },

        () => {
            document.getElementById("miasto").innerText = "📍 NIE UDAŁO SIĘ POBRAĆ LOKALIZACJI"
        }
    )
}

document.getElementById("lublin").addEventListener("click", ustawLublin)
document.getElementById("mojalokalozacja").addEventListener("click", mojaLokalizacja)

dane()
setInterval(dane, 600000)