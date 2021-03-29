function wait(ml = 100) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ml);
  });
}

// This are all the queries used to select UI elements in their nested order
const LIST_OF_ALL_VIDEOS_QUERY_SELECTOR =
  "#contents > ytd-playlist-video-renderer";
const SINGLE_VIDEO_MENU_BUTTON_QUERY_SELECTOR =
  "#button.style-scope.yt-icon-button";
const DELETE_OPTION_ON_MULTIPLE_OPTIONS_MENU_QUERY_SELECTOR =
  "#items > ytd-menu-service-item-renderer:nth-child(3) > paper-item";
const DELETE_OPTION_ON_SINGLE_OPTION_MENU_QUERY_SELECTOR =
  "#items > ytd-menu-service-item-renderer > paper-item";

const iterateAndTriggerClickFunction = async (
  elements,
  startAt,
  amountOfVideosToDelete,
  showLogs,
  originalAmountOfVideosToDelete
) => {
  for (let i = 0; i < elements.length; i++) {
    // Stops the loop after it reaches the number of deletions that you provided
    if (i >= startAt + amountOfVideosToDelete) {
      break;
    }

    // Deletes only after the index that you provided
    if (i >= startAt) {
      const currentDeletionNumber =
        originalAmountOfVideosToDelete - amountOfVideosToDelete + (i + 1);

      // Select the menu button of this video's row
      const element = elements[i].querySelector(
        SINGLE_VIDEO_MENU_BUTTON_QUERY_SELECTOR
      );

      // Click on the menu for the pop-up to open and wait for the animation
      element.click();
      await wait();

      // Select the delete option in the pop-up, the 3rd button (Change if it is not the 3rd row in your playlist)
      const menuButton = document.querySelector(
        DELETE_OPTION_ON_MULTIPLE_OPTIONS_MENU_QUERY_SELECTOR
      );

      // Sometimes there will not be a third row, this means that the element will not exist
      if (menuButton) {
        showLogs &&
          console.log(
            "#",
            currentDeletionNumber,
            " Deleting video: ",
            menuButton
          );

        menuButton.click();
        await wait();

        // If the element didn't exist above, is because it was a video that had been deleted from Youtube
        // In this case we reselect the one and only option (delete) in the pop-up menu
      } else {
        const deletedVideoMenuButton = document.querySelector(
          DELETE_OPTION_ON_SINGLE_OPTION_MENU_QUERY_SELECTOR
        );

        showLogs &&
          console.log(
            "#",
            currentDeletionNumber,
            " Deleting video that had been removed from youtube: ",
            deletedVideoMenuButton
          );

        deletedVideoMenuButton.click();
        await wait();
      }
    }
  }

  const remainingAmountOfVideosToDelete =
    amountOfVideosToDelete - elements.length;

  // Often, the UI contained less videos than you wanted to delete,
  // so we recursively start the process again
  if (remainingAmountOfVideosToDelete > 0) {
    showLogs &&
      console.log(
        'Recursively calling method "main", remaining videos to be deleted: '
      );

    main(
      0, // Always starting at the first video after being the first time
      remainingAmountOfVideosToDelete,
      showLogs,
      originalAmountOfVideosToDelete
    );
  } else {
    const singularOrPluralWord =
      originalAmountOfVideosToDelete === 1 ? " videos." : " video.";

    // This log is alway called, letting you know that the process has finished
    console.log(
      "DONE. Deleted ",
      originalAmountOfVideosToDelete,
      singularOrPluralWord
    );
  }
};

const main = (
  startAt = 0,
  amountOfVideosToDelete = 1,
  showLogs = false,
  originalAmountOfVideosToDelete
) => {
  // Selects all the video rows. A list with one element for every video in the playlist
  const playlistVideoRow = document.querySelectorAll(
    LIST_OF_ALL_VIDEOS_QUERY_SELECTOR
  );

  showLogs &&
    console.log(
      "Number of videos selected: ",
      (playlistVideoRow && playlistVideoRow.length) || 0
    );

  if (playlistVideoRow && playlistVideoRow.length) {
    const originalAmount =
      originalAmountOfVideosToDelete || amountOfVideosToDelete;

    iterateAndTriggerClickFunction(
      playlistVideoRow,
      startAt,
      amountOfVideosToDelete,
      showLogs,
      originalAmount
    );
  }
};

// Example execution: delete 210 videos starting by the first one and logging the process.
main(0, 210, true);
