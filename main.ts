// Als we op knop A drukken de draaien we de waarde van 'moetSchenken' om.
// Hierdoor schakelen we tussen het weergeven van de druppels met de ledstrip en het schrijven van de rotatie waarden naar de grafiek
input.onButtonPressed(Button.A, function () {
    moetSchenken = !(moetSchenken)
})
function schenk () {
    // zitten er nog druppels in de gieter?
    // Zo ja voer onderstaande uit.
    if (huidigeInhoud > 0) {
        // Zet de allereerste led aan met de huidige kleur uit de lijst die we gemaakt hebben
        strip.setPixelColor(0, colors[colorIndex])
        strip.show()
    }
    // Hoog het getal dat wijst naar de positie in de lijst met kleuren met 1 op.
    colorIndex += 1
    // Is het  getal dat wijst naar de positie in de lijst met kleuren groter dan 2? stel het dan weer in op 0
    if (colorIndex > 2) {
        colorIndex = 0
    }
    // Haal er een druppel af
    huidigeInhoud += -1
    // Speel een geluidje. De toonhoogte is afhankelijk van het aantal druppels dat nog in de gieter zit
    music.play(music.tonePlayable(1.5 * huidigeInhoud, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.InBackground)
}
// Als we op knop B drukken vullen we de gieter weer
input.onButtonPressed(Button.B, function () {
    huidigeInhoud = 100
})
/**
 * Dit is een microbit project dat een gieter simuleert.
 * 
 * Een ledstrip (30 pixels in dit voorbeeld) is verbonden aan P0
 * 
 * Een gevorderde uitdaging is het bepalen van het getal voor de kleuren van de leds.
 * 
 * De kleuren Rood Groen Blauw kunnen waardes hebben van 0 tot 255
 * 
 * Om tot een kleur als 1 getal te komen  gebruik je de volgende berekening:
 * 
 * (R*65536) + (G * 256) + B
 * 
 * hier zou je ook een functie voor kunnen maken
 * 
 * Programmeer concepten:
 * 
 * - Conditionele instructies ( If->Then->Else / als->dan->anders )
 * 
 * - Variabelen  (getallen , booleans , array )
 * 
 * - Lijsten (array)
 * 
 * - Functies
 * 
 * - Events   (Start, Input )
 * 
 * - Loop  (Forever)
 * 
 * - Debug strategie
 */
let colorIndex = 0
let huidigeInhoud = 0
let moetSchenken = false
let strip: neopixel.Strip = null
let colors: number[] = []
// maak drie kleuren blauw
let color1 = 58
let color2 = 4488
let color3 = 13226
// maak een lijst van de kleuren zodat we ze op basis van een nummer kunnen gebruik.  ( bijv ' de 2e uit de lijst ).
// Let op bij programmeren begint een lijst vaak bij 0 .
// dus een lijst met 3 elementen heeft als nummers. 0,1 en 2
colors = [color1, color2, color3]
strip = neopixel.create(DigitalPin.P0, 30, NeoPixelMode.RGB)
// Onder welke hoek beginnen we 'druppelen'
let schenkHoek = 45
// dit is de pauze tussen druppels in miliseconden
let druppelPauze = 40
// maak een vlaggetje om het wel of niet schenken in te kunnen stellen
moetSchenken = true
// Stel het aantal druppels aan inhoud in
huidigeInhoud = 100
basic.forever(function () {
    // Staat het vlaggetje (Boolean)  voor 'moetschenken' wel op waar? Zoja dan gaan we iets uitvoeren
    if (moetSchenken) {
        // Is de microbit gekanteld tussen de 45 en 90 graden?
        // Zoja voer dan uit wat in de functie 'schenk' staat
        if (input.rotation(Rotation.Pitch) > schenkHoek && input.rotation(Rotation.Pitch) < 90) {
            schenk()
        }
    } else {
        // Staat het vlaggetje (Boolean)  voor 'moetschenken' on onwaar dan gebruiken we dit om in een grafiek de huidige rotatie van de microbit op te slaan, zodat we die kunnen controleren als iets niet werkt zoals verwacht.
        serial.writeLine("" + input.rotation(Rotation.Pitch) + "," + input.rotation(Rotation.Roll))
    }
    // schuif de leds (lampjes) 1 plek op . dit zorgt voor beweging
    strip.shift(1)
    // bij een verandering van de leds moeten we expliciet zeggen dat we de wijzigingen willen zien .
    strip.show()
    // Toon op de lampjes op de microbit zelf de huidige hoeveelheid 'druppels' als een soort staafdiagram
    led.plotBarGraph(
    huidigeInhoud,
    100
    )
    // doe een kleine pauze tussen de druppels omdat het anders te snel gaat
    basic.pause(druppelPauze)
})
