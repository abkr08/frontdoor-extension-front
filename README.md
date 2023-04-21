# Highlight Chrome Extension

## Description

The Highlight Chrome extension allows you to highlight and tag text on any webpage, and save your highlights to a MongoDB database.

## Installation

1. Clone the the frontend and backend repository to your local machine:

git clone https://github.com/abkr08/frontdoor-extension-front.git

git clone https://github.com/abkr08/frontdoor-extension-backend.git

2. Open the Chrome browser and navigate to `chrome://extensions`.
3. Turn on the **Developer mode** toggle in the top-right corner.
4. Click the **Load unpacked** button in the top-left corner.
5. Select the folder where you cloned the repository in step 1.
6. Start your Nestjs server

## Usage

1. Click the Highlight icon in the Chrome toolbar to open the extension popup.
2. Select some text on the current webpage that you want to highlight.
3. Enter one or more tags for the highlight, separated by commas.
4. Click the **Save** button to save the highlight to the database.
5. To view your saved highlights, click the **View Highlights** button in the extension popup.

## Configuration

To configure the extension, you can modify the following options in the `.env` file on the backend:

- `MONGODB_URI`: The URI for your MongoDB database.
- `MONGODB_DB`: The name of the database to use.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

This extension was inspired by the [Web-Highlighter]() extension by Marius Bongarts.
