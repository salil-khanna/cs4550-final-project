import requests
import webbrowser

def search_and_open_artworks(search_term):
    url = f'https://api.artic.edu/api/v1/artworks/search?q={search_term}&query[term][is_public_domain]=true&limit=5&fields=id,title,image_id'
    response = requests.get(url)
    result = response.json()

    base_url = result['config']['iiif_url']

    artwork_data = [(item['image_id'], item['title']) for item in result['data']]


    for image_id, title in artwork_data:
        print(image_id)
        if image_id:
            image_url = f'{base_url}/{image_id}/full/843,/0/default.jpg'
            print(f'OPENING {title}')
            webbrowser.open(image_url)

if __name__ == '__main__':
    search_term = input("Enter a search term: ")
    search_and_open_artworks(search_term)
