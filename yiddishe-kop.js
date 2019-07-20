jQuery(document).ready(function ($) {

  $('.rashi, .tosafos').each(function () {

    let html = $(this).html();

    html = html.replace(/(\(.+?\))/g, '<small>$1</small>') // make mekoros small

    if ($(this).hasClass('rashi')) {

      // doing some magic with GREP 🤩
      html = html.replace(/(?<=:\s)(.+?\.)/g, '<span class="dibbur">$1</span>') // whole dibbur in 1 line
      html = html.replace(/(?<=:\s)(.+?)\<\/span\>/g, '<span class="dibbur">$1</span></span>') // beginning of dibbur
      html = html.replace(/(?<=\<span class=\"line.*?\"\>)([א-ת\s'"׳״]+?\.)/g, '<span class="dibbur">$1</span>') // 2nd line (end of dibbur)
    } else {
      html = html.replace(/\-{2}(.+?\.)/g, '<span class="dibbur">==$1</span>') // whole dibbur in 1 line
      html = html.replace(/(?<!\.)\-{2}(.+?)\<\/span\>/g, '<span class="dibbur">==$1</span></span>') // beginning of dibbur
      html = html.replace(/(?<=\<span class=\"line.*?\"\>)(.+?\.)\-{2}/g, '<span class="dibbur">$1</span>') // 2nd line (end of dibbur)
      html = html.replace(/(?<=\<span class=\"dibbur\"\>)==([א-ת'"׳״.]+)\-?/g, '<span class="tos-dibbur-big">$1</span>') // 1st word of dibbur (make it big)
    }

    $(this).html(html)

    // creates CHALON in tosafos
    $('.tosafos .tos-dibbur-big').each(function() {
      let bigWord = $(this)
      let parentLine = bigWord.parent().parent()
      if (parentLine.html().match(/^\<span class=\"dibbur/)) { // only if it's at start of line
        let nextLine = parentLine.next()
        nextLine.css('width', nextLine[0].offsetWidth - 15 - bigWord[0].offsetWidth)
        parentLine.prev().css({textAlignLast: 'center'})
      }
    })
  })

  // creates biur
  $('.line').attr({
    'data-container': 'body',
    'data-toggle': "popover",
    'data-placement': "left",
    'title': "פירוש משולב 🤩",
    'data-content': function () {
      return $(this).text()
    }
  })

  $('[data-toggle="popover"]').popover({
    trigger: 'hover',
    animation: true
  })
})
