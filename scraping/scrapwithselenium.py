import json
import csv
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

ldlc_url = "https://www.ldlc.com/informatique/peripherique-pc/moniteur-pc/c4623/"

def scrape_with_selenium(url, json_output_file, csv_output_file):
    options = Options()
    options.headless = False  # Set to True for headless mode
    driver = webdriver.Chrome(options=options)

    driver.get(url)

    time.sleep(3)

    prices = []
    models = []

    # Scrape prices
    screens = driver.find_elements(By.CLASS_NAME, "dsp-cell-right")
    for screen in screens:
        price = screen.find_element(By.CLASS_NAME, "price")
        old_price = price.find_elements(By.CLASS_NAME, "old-price")
        if old_price:
            new_price = screen.find_element(By.CLASS_NAME, "new-price")
            prices.append(new_price.text)
        else:
            prices.append(price.text)

    # Scrape models
    model_screen = driver.find_elements(By.CLASS_NAME, "title-3")
    for model in model_screen:
        models.append(model.text)

    driver.quit()

    # Check if the lengths of prices and models lists are the same
    if len(prices) != len(models):
        print("Error: Lengths of prices and models lists are not the same.")
        return

    # Combine models and prices into a list of dictionaries
    data = [{'Model': model, 'Price': price} for model, price in zip(models, prices)]

    # Save data to JSON file
    with open(json_output_file, 'w') as json_file:
        json.dump(data, json_file)

    # Save data to CSV file
    with open(csv_output_file, 'w', newline='') as csv_file:
        fieldnames = ['Model', 'Price']
        writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)

# Provide the file names for JSON and CSV output
json_output_file = 'models_and_prices.json'
csv_output_file = 'models_and_prices.csv'

# Call the function with URLs and file names
scrape_with_selenium(ldlc_url, json_output_file, csv_output_file)
