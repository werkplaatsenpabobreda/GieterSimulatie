def on_button_pressed_a():
    global pouring
    pouring = not (pouring)
input.on_button_pressed(Button.A, on_button_pressed_a)

def drip():
    global colorIndex
    strip.shift(1)
    strip.set_pixel_color(0, colorList[colorIndex])
    strip.show()
    colorIndex += 1
    if colorIndex > 2:
        colorIndex = 0
colorIndex = 0
strip: neopixel.Strip = None
colorList: List[number] = []
pouring = False
pouring = True
pourSpeed = 30
b1 = 3122643
b2 = 8112616
b3 = 730930
colorList = [b1, b2, b3]
strip = neopixel.create(DigitalPin.P0, 30, NeoPixelMode.RGB)

def on_forever():
    global pouring
    if input.rotation(Rotation.PITCH) > 25:
        pouring = True
    else:
        pouring = False
    if pouring:
        drip()
    else:
        strip.shift(1)
        strip.show()
    basic.pause(pourSpeed)
basic.forever(on_forever)
