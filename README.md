# youtube-playlist-videos-auto-delete
A bit of code that you can run on your browser's console if you are on a Youtube's playlist page, and it will automatically delete videos from top to bottom.

Useful as of the creation of this repository because Youtube removed the option to delete all videos at once. And some playlists can't be deleted. So you have to go one by one... Or automate it with this YEYYYYYY.

I'm guessing it won't work if they updated the UI. Although I'm using pretty generic class names for the selectors.


## Problems with this script

* Even though there is a delay after every action, eventually your browser might freeze. Then, just call the main function again or refresh the page and apply again.
* I think videos on your list that have been made private since you added them ("Private video"), are sometimes not being picked up. I haven't looked into why, but they get deleted most of the times.
