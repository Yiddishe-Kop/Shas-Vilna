jQuery(document).ready(function ($) {

  $('.document .wrapper').html(function () {
    return $(this).html().replace(/\<br\>/gi, '<i></i>');
  })

  $('.rashi, .tosafos').each(function () {

    let html = $(this).html();
    html = html.replace(/[\n\r]\s*/g, '') // remove returns/whitespace
    html = html.replace(/(\(.+?\))/g, '<small>$1</small>') // make mekoros small

    if ($(this).hasClass('rashi')) {

      // doing some magic with GREP 🤩
      // for browser that don't yet support lookbehind
      html = html.replace(/(:\s|\<span.+?md.+?\>)(.+?\.)(.+?(?=:))/g, (match, g1, dibbur, body) => {
        dibbur = dibbur.replace(/(\<\/span\>\<span.+?(sm|md|lg).+?\>)/g, '</span>$1<span class="dibbur">')
        body = body.replace(/(\<\/span\>\<span.+?(sm|md|lg).+?\>)/g, '</span>$1<span class="rashi-body">')
        return `${g1}<span class="dibbur">${dibbur}</span><span class="rashi-body">${body}</span>`
      })
      html = html.replace(/(\^)([א-ת.]+)/g, (match, g1, firstWord) => { // creates BIG WORD - only if beginning of line
        return `${g1.replace('^', '')}<span class="chalon">${firstWord}</span>`
      })
    } else { // tosfot
      html = html.replace(/\@1(.+?)\@2(.+?)\@3/g, (match, dibbur, body) => { // creates dibbur & body - from @1 @2 @3
        dibbur = dibbur.replace(/(\<\/span\>\<span.+?(sm|md|lg).+?\>)/g, '</span>$1<span class="dibbur">')
        body = body.replace(/(\<\/span\>\<span.+?(sm|md|lg).+?\>)/g, '</span>$1<span class="tosfot-body">')
        return `<span class="dibbur">${dibbur}</span><span class="tosfot-body">${body}</span>`
      })
      html = html.replace(/(^\<span.+?md.+?\>|\<\/i\>\<span.+?dibbur.+?\>)([א-ת.]+)/g, (match, g1, firstWord) => { // creates BIG WORD - only if beginning of line
        return `${g1}<span class="chalon">${firstWord}</span>`
      })
    }

    $(this).html(html)

    createChalonSpacer($(this).hasClass('rashi') ? '.rashi' : '.tosafos')

    // create inline dibbur in tosfos
    $('.tosafos .dibbur').each(function () {
      if (!$(this).find(">:first-child").hasClass('chalon')) {
        let html = $(this).html()
        html = html.replace(/^.*?([א-ת״׳.]+)/, '<span class="tos-not-chalon">$1</span>')
        $(this).html(html)
      }
    })
  })

  // connect whole pieces on hover
  $('.wrapper span.rashi-body, .wrapper span.tosfot-body, .wrapper span.dibbur').hover(function () {
    let thisClass = $(this).attr('class')
    if ($(this).next()[0]) return
    let next = $(this).parent().next().find(">:first-child")
    if (next.hasClass(thisClass)) {
      next.toggleClass('hover')
      if (!next.next()[0]) { // should really find a recursive solution [maybe you can help, Shaye 😊 ?]
        let next2 = next.parent().next().find(">:first-child")
        if (next2.hasClass(thisClass)) {
          next2.toggleClass('hover')
        }
      }
    }
  })

  // creates biur
  $('.dibbur').attr({
    'data-container': 'body',
    'data-toggle': "popover",
    'data-placement': "left",
    'title': function () {
      return $(this).text()
    },
    'data-content': function () {
      return $(this).next().text()
    }
  })

  // creates popup for mekoros
  $('.wrapper small').attr({
    'data-toggle': 'modal',
    'data-target': "#exampleModalCenter",
  })

  $('[data-toggle="popover"]').popover({
    trigger: 'hover',
    animation: true
  })

  function createChalonSpacer(selector) {

    // spacer under CHALON
    let chalonWidths = []
    $(selector + ' .chalon').each(function () {
      chalonWidths.push($(this)[0].offsetWidth)
    })

    let i = 0;
    html = $(selector).html();
    html = html.replace(/(chalon.+?\<\/i\>)(.)/g, (match, g1, nextLineFirstChar) => { // creates CHALON spacer
      return `${g1}<span class='chalon-spacer' style='width: ${chalonWidths[i++]}px;'></span>${nextLineFirstChar}`
    })
    $(selector).html(html)
  }
})
