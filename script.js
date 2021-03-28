function wait(ml = 100) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ml);
  });
}

const iterateAndTriggerClickFunction = async (
  elements,
  startAt,
  stopAfter,
  logs
) => {
  for (var i = 0; i < elements.length; i++) {
    // Stops the loop after it reaches the number of deletions that you provided
    if (i >= startAt + stopAfter) {
      break;
    }

    // Deletes only after the index that you provided
    if (i >= startAt) {
      // Select the menu button of this video's row
      const element = elements[i].querySelector(
        "#button.style-scope.yt-icon-button"
      );

      // Click on the menu for the pop-up to open and wait for the animation
      element.click();
      await wait();

      // Select the delete option in the pop-up, the 3rd button (Change if it is not the 3rd row in your playlist)
      const menuButton = document.querySelector(
        "#items > ytd-menu-service-item-renderer:nth-child(3) > paper-item"
      );

      // Sometimes there will not be a third row, this means that the element will not exist
      if (menuButton) {
        logs && console.log("Deleting video: ", menuButton);

        menuButton.click();
        await wait();

        // If the element didn't exist above, is because it was a video that had been deleted from Youtube
        // In this case we reselect the one and only option (delete) in the pop-up menu
      } else {
        const deletedVideoMenuButton = document.querySelector(
          "#items > ytd-menu-service-item-renderer > paper-item"
        );

        logs &&
          console.log(
            "Deleting video that had been removed from youtube: ",
            deletedVideoMenuButton
          );

        deletedVideoMenuButton.click();
        await wait();
      }
    }
  }
};

const main = (query, startAt = 0, stopAfter = 1, logs = false) => {
  // Selects all the video rows. A list with one element for every video in the playlist
  const playlistVideoRow = document.querySelectorAll(query);

  iterateAndTriggerClickFunction(playlistVideoRow, startAt, stopAfter, logs);
};

main("#contents > ytd-playlist-video-renderer", 0, 100);
