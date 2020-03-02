new Vue({
  el: '#app',
  data: {
    newColor: '',
    addedColors: [],
    invalidColor: false,
    validColor: /^([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
  },
  computed: {
    rgbValue: function () {
      const hexValue = this.newColor.split('');
      let r, g, b;
      // 3 digit hex code (repeat same letter to make it as 6 digits)
      if (this.newColor.length === 3) {
        r = parseInt(hexValue[0].toString() + hexValue[0].toString(), 16);
        g = parseInt(hexValue[1].toString() + hexValue[1].toString(), 16);
        b = parseInt(hexValue[2].toString() + hexValue[2].toString(), 16);
        // 6 digt hex code
      } else if (this.newColor.length === 6) {
        r = parseInt(hexValue[0].toString() + hexValue[1].toString(), 16);
        g = parseInt(hexValue[2].toString() + hexValue[3].toString(), 16);
        b = parseInt(hexValue[4].toString() + hexValue[5].toString(), 16);
      }
      if (this.validColor.test(this.newColor) !== true) {
        r = g = b = '---';
      }
      return r + ', ' + g + ', ' + b;
    }
  },
  methods: {
    addItem: function () {
      const addedColor = {
        hex: "#" + this.newColor,
        rgb: "rgb(" + this.rgbValue + ")"
      };
      if (this.validColor.test(this.newColor) !== false) {
        this.addedColors.push(addedColor);
        this.newColor = ""
        this.invalidColor = false;
      } else {
        // Add class and shake a text field
        this.invalidColor = true;
      }
    },
    // Remove .error class when any key except Enter pressed
    removeClass: function (event) {
      if (event.key !== 'Enter') {
        this.invalidColor = false;
      }
    }
  }
});

/* コピーとツールチップ
--------------------------------*/
const clipboard = new ClipboardJS('.copy-value');

// Select all .copy-value items
const btns = document.querySelectorAll('.copy-value');

// Remove .tooptip class by mouseout
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener('mouseleave', clearTooltip);
}
function clearTooltip(e) {
  e.currentTarget.setAttribute('class', 'copy-value');
}

// Add .tooltip class when it's clicked
function showTooltip(elem) {
  elem.setAttribute('class', 'copy-value tooltip');
}

clipboard.on('success', function (e) {
  showTooltip(e.trigger);

  // Clear selecting text
  e.clearSelection();
});
