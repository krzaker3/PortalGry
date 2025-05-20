from django.shortcuts import render, Http404

# Create your views here.
news_items = [
                 {
                     "id":1,
                     "title": "KK",
                     "image": "https://dol-ek.pl/2560-large_default/kolko-i-krzyzyk-ez-t-19e.jpg",
                     "description": "Gra strategiczna rozgrywana przez dwóch graczy",
                     "date": "",
                     "label": None,
                     "iframe": '/index.html'
                 },
                 {
                    "id":2,
                     "title": "Snake",
                     "image": "https://i.ytimg.com/vi/aVPj0phGjyU/hqdefault.jpg",
                     "description": "gra komputerowa, w której gracz kontroluje długą i cienką linię, przypominającą węża, poruszającą się po obramowanej planszy.",
                     "date": "",
                     "label": "Akcja",
                     "iframe": 'snake/index.html'
                 },
                 {
                    "id":3,
                     "title": "Tetris",
                     "image": "https://images.steamusercontent.com/ugc/383161437201192360/CCE6224F8588F50D15FF809FB9B7BD2E64C32FB1/",
                     "description": "Klasyczna gra logiczna, w której gracz kontroluje spadające klocki różnego kształtu i układa je w studni, aby tworzyć ciągłe poziome linie.",
                     "date": "",
                     "label": None,
                      "iframe": 'tetris/index.html'
                 },
             ]


def index(request):
    context = {"news_items": news_items}

    return render(request, 'index.html', context)


def details(request, id):
    try:
        item = news_items[id - 1]
    except IndexError:
        raise Http404("Nie znaleziono wpisu.")

    context = {"item": item}
    return render(request, 'details.html', context)