<table>
        <tr>
            <td><img width="20" src="https://cdnjs.cloudflare.com/ajax/libs/octicons/8.5.0/svg/archive.svg" alt="archived" /></td>
            <td><strong>Archived Repository</strong><br />
            This code is no longer maintained. Feel free to fork it, but use it at your own risks.
        </td>
        </tr>
</table>

# Chrome Bug Report Wizard

The Chrome Bug Report Wizard extension is a plug-in aimed to simplify the debugging. Indeed, very often, customers give feedback with insufficient informations (what an euphemism). For instance, how many times did your customer forget to give your the URL with their report? This is especially sad as these data may be gathered automatically very easily. And, this is exactly what this plug-in does. Currently, it retrieves:

* Current page URL
* Browser details (user-agent, navigator version, language...)
* Screenshot of the page at current state

And, as an agile developer you use some bug trackers, this extension will post automatically the data on your favorite interface. It currently supports only [Pivotal Tracker](http://www.pivotaltracker.com), yet support will be widened progressively to all other main solutions.

## Installing the extension

### Grabbing the last offcial release

*[Coming soon...]*

### Using the bleeding edge version

If you can't wait the next release to get the latest features, you may also package yourself the extension. Just clone the repository:

``` sh
git clone git@github.com:marmelab/chrome-bug-report-wizard.git
```

Then, open your Chrome browser and go to `chrome://extensions`. Then, enable the developer mode, add an extension selecting its folder, and enjoy!

## Configuration

Currently, configuration is really simple. Going into the extension options, you may configure:

* **Pivotal API token:** you can find it on your Pivotal Tracker profile,
* **Pivotal project id:** available in your project URL (for instance, https://www.pivotaltracker.com/s/projects/**1005528**)

## License

This project is released under the MIT license (thanks to [Marmelab](http://www.marmelab.com) courtesy). It means you can use it freely, even on your consumer workstations. You also can clone this project, as long as you keep the original license file into your fork.

## Special thanks

A special thanks to [Icojam](http://www.icojam.com) for providing the extension icon (taken from the [Blueberry icon pack](https://www.iconfinder.com/iconsets/blueberry#readme)).
