autoHeightAnimate = (element, time) ->
  curHeight = element.height()
  autoHeight = element.css('height', 'auto').height()
  # Get Auto Height
  element.height curHeight
  # Reset to Default Height
  element.stop().animate { height: autoHeight }, time
  # Animate to Auto Height
  return

$ ->
  nav = $('.sub-menu')
  animateTime = 300
  navLink = $('#main-menu')
  navLink.click ()->
    if nav.height() == 0
      autoHeightAnimate nav, animateTime
      $(navLink).addClass('active')
    else
      nav.stop().animate { height: '0' }, animateTime
      $(navLink).removeClass('active')
    return
  return


$('.sub-menu').click (e)->
  e.stopPropagation()