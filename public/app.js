$(document).ready(function() {
    // Toggle Sidebar
    $("#menu-bar-max").click(function(){
        $('#logo').toggleClass('mx-20');
        $('.max-bar').toggle(300);
        $('#sidebar').toggleClass('minimum');
        $('#main').toggleClass('lg:ml-56 lg:ml-16');
    });
    $("#menu-bar-min").click(function(){
        $('.max-bar').toggle(300);
        $('.min-bar').toggle(300);
        $('#sidebar').removeClass('minimum');
    });
    // Toggle mini Sidebar
    $( "#sidebar" )
        .mouseenter(function() {
            if($(this).hasClass('minimum')) {
                $('.max-bar').toggle(300);
            }
        })
        .mouseleave(function() {
            if($(this).hasClass('minimum')) {
                $('.max-bar').toggle(300);
            }
        });

    // Toggle Search Box
    $("#ToggleSearchBox").click(function(){
        $('#SearchBox').toggleClass("hidden");
    });
    // Navbar Show hide popover
     $(".nav-dropdown").click(function(){
        $(this).find(".dropdown-menu").slideToggle( "slow");
        $(this).find(".navbar-arrow").toggleClass("rotate-180");
    });

    //  Close popover on click outside
    $(document).on("click", function(event){
        var $trigger1 = $("#admin-dropdown");
        var $trigger2 = $("#language-dropdown");
        if($trigger1 !== event.target && !$trigger1.has(event.target).length){
            $trigger1.find(".dropdown-menu").slideUp('slow');
            $trigger1.find(".navbar-arrow").removeClass("rotate-180");
        }            
        if($trigger2 !== event.target && !$trigger2.has(event.target).length){
            $trigger2.find(".dropdown-menu").slideUp('slow');
            $trigger2.find(".navbar-arrow").removeClass("rotate-180");
        }            
    });

	// Sidebar dropdown
	var Sidemenu = function() {
		this.$menuItem = $('#sidebar-menu a');
	};
	
	function init() {
		var $this = Sidemenu;
		$('#sidebar-menu a').on('click', function(e) {
			if($(this).parent().hasClass('submenu')) {
				e.preventDefault();
			}
			if(!$(this).hasClass('subdrop')) {
				$('ul', $(this).parents('ul:first')).slideUp(350);
				$('ul', $(this).parents('ul:first')).find(".menu-arrow").removeClass('rotate-90');
				$('a', $(this).parents('ul:first')).removeClass('subdrop');
				$('a', $(this).parents('ul:first')).find(".menu-arrow").removeClass('rotate-90');
				$(this).next('ul').slideDown(350);
				$(this).addClass('subdrop');
                $(this).find(".menu-arrow").addClass('rotate-90');
				
			} else if($(this).hasClass('subdrop')) {
				$(this).removeClass('subdrop');
				$(this).next('ul').slideUp(350);
                $(this).find(".menu-arrow").removeClass('rotate-90');
			}
		});
		$('#sidebar-menu ul li.submenu a.active').parents('li:last').children('a:first').addClass('active').trigger('click');
	}
	
	// Sidebar Initiate
	init();
    
});

