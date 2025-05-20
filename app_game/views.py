from django.shortcuts import render, Http404

# Create your views here.
news_items = [
                 {
                     "id":1,
                     "title": "KK",
                     "image": "https://picsum.photos/400/200?random=3",
                     "description": "W trakcie wydarzenia zdobywasz unikalne samoloty.",
                     "date": "10 kwietnia 2025",
                     "label": None,
                     "iframe": 'kk/index.html'
                 },
                 {
                    "id":2,
                     "title": "Snake",
                     "image": "https://picsum.photos/400/200?random=4",
                     "description": "",
                     "date": "23 kwietnia 2025",
                     "label": "Akcja",
                     "iframe": 'snake/index.html'
                 },
                 {
                    "id":3,
                     "title": "Tetris",
                     "image": "https://picsum.photos/400/200?random=5",
                     "description": "",
                     "date": "23 kwietnia 2025",
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