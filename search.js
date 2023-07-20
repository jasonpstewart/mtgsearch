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

    $("#results tbody").text("");

    let page = 1;

    // make ajax request
    $.get(
      searchUrl(searchCardName, searchCardType, searchCardColor, page),
      function (data) {
        // loop through the cards and append to the table
        $.each(data.cards, function (index, card) {
          var power = typeof card.power !== "undefined" ? card.power : "x";
          var toughness =
            typeof card.toughness !== "undefined" ? card.toughness : "x";
          $("#results tbody").append(
            "<tr><td>#" +
              card.number +
              "</td><td>" +
              card.name +
              "</td><td>" +
              card.manaCost +
              "</td><td>" +
              card.colors +
              "</td><td>" +
              card.type +
              "</td><td>" +
              power +
              "/" +
              toughness +
              "</td><td style='white-space: pre-wrap'>" +
              card.text +
              "</td></tr>"
          );
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
