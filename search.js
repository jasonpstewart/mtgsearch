$(document).ready(function () {
  function searchUrl(searchCardName, searchCardType, searchCardColor, page) {
    return (
      "https://api.magicthegathering.io/v1/cards?page=" +
      page +
      "&name=" +
      searchCardName +
      "&type=" +
      searchCardType +
      "&colors=" +
      searchCardColor
    );
  }

  document.getElementById("search").addEventListener("click", function (event) {
    // get input values
    var searchCardName = $("#card_name").val();
    var searchCardType = $("#card_type").val();
    var searchCardColor = $("#card_color").val();

    $("#results-row").text("");

    let page = 1;
    let colTextLength = 0;
    let separator = "\n----------\n";
    let currentColumn;
    // make ajax request
    $.get(
      searchUrl(searchCardName, searchCardType, searchCardColor, page),
      function (data) {
        // loop through the cards and append to the table
        $.each(data.cards, function (index, card) {
          let power = typeof card.power !== "undefined" ? card.power : "x";
          let toughness =
            typeof card.toughness !== "undefined" ? card.toughness : "x";

          let cardText =
            "#" +
            card.number +
            " " +
            card.name +
            " " +
            card.manaCost +
            "\n" +
            card.type +
            " " +
            power +
            "/" +
            toughness +
            "\n" +
            card.text;

          if (colTextLength + cardText.length + separator.length > 1500) {
            // Make a new column!
            colTextLength = 0;
          }

          if (colTextLength == 0) {
            // create new coloumn, point to new column for text.
            currentColumn = document.createElement("div");
            currentColumn.classList.add("col");
            currentColumn.style.whiteSpace="pre-line";
            document.getElementById("results-row").appendChild(currentColumn);
          } else {
            // we can fit in current column, add a separateor before the card text..
            cardText = separator + cardText;
          }

          let cardTextNode = document.createTextNode(cardText);
          currentColumn.appendChild(cardTextNode);
          colTextLength = colTextLength + cardText.length;
        });
      }
    );
  });

  function selectElementContents(el) {
    var body = document.body,
      range,
      sel;
    if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      sel.removeAllRanges();
      try {
        range.selectNodeContents(el);
        sel.addRange(range);
      } catch (e) {
        range.selectNode(el);
        sel.addRange(range);
      }
    } else if (body.createTextRange) {
      range = body.createTextRange();
      range.moveToElementText(el);
      range.select();
    }
  }

  document
    .getElementById("download")
    .addEventListener("click", function (event) {
      // $("#results").table2csv(); // default action is download
      selectElementContents(document.getElementById("results"));
      document.execCommand("Copy");
    });
});
