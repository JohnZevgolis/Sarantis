function initMap() {
	var markers,
		gmarkers = [],
		gmarkers2 = [];
	$.ajax({
		type: "GET",
        url: "/assets/scripts/markers.json",
        data: { Language: Language },
		dataType: "JSON",
		success: function(markers) {
			$.each(markers, function(i, item) {
				markers = markers;				
			});	
			process(markers);
		}
	});

	function process(markers) {
        var infoBox = document.getElementById('infobox'),
            infoboxAddress = infoBox.getElementsByClassName('infobox-bottom'),
			c_title = infoBox.getElementsByClassName('infobox-title'),
			c_address = infobox.getElementsByClassName('infobox-address'),
			c_externalLink = infobox.getElementsByClassName('external-link'),
			c_list = infobox.getElementsByClassName('infobox-list');
		/**
		 * Function to init map
		 */

	    center = new google.maps.LatLng(0, 0);
	    var mapOptions = {
	        zoom: 0,
	        mapTypeId: google.maps.MapTypeId.ROADMAP,
	        minZoom: 0, 
	        // maxZoom: 11,
	        disableDefaultUI: true,
	        zoomControl: true,
	        zoomControlOptions: {
		    position: google.maps.ControlPosition.LEFT_BOTTOM
		    },
	        styles: [
			    {
			        "featureType": "all",
			        "elementType": "all",
			        "stylers": [
			            {
			                "visibility": "on"
			            }
			        ]
			    },
			    {
			        "featureType": "all",
			        "elementType": "labels",
			        "stylers": [
			            {
			                "visibility": "off"
			            },
			            {
			                "saturation": "-100"
			            }
			        ]
			    },
			    {
			        "featureType": "all",
			        "elementType": "labels.text.fill",
			        "stylers": [
			            {
			                "saturation": 36
			            },
			            {
			                "color": "#000000"
			            },
			            {
			                "lightness": 40
			            },
			            {
			                "visibility": "off"
			            }
			        ]
			    },
			    {
			        "featureType": "all",
			        "elementType": "labels.text.stroke",
			        "stylers": [
			            {
			                "visibility": "off"
			            },
			            {
			                "color": "#000000"
			            },
			            {
			                "lightness": 16
			            }
			        ]
			    },
			    {
			        "featureType": "all",
			        "elementType": "labels.icon",
			        "stylers": [
			            {
			                "visibility": "off"
			            }
			        ]
			    },
			    {
			        "featureType": "administrative",
			        "elementType": "geometry.fill",
			        "stylers": [
			            {
			                "color": "#0a0a14"
			            },
			            {
			                "lightness": 20
			            }
			        ]
			    },
			    {
			        "featureType": "administrative",
			        "elementType": "geometry.stroke",
			        "stylers": [
			            {
			                "color": "#0b0c1d"
			            },
			            {
			                "lightness": 17
			            },
			            {
			                "weight": 1.2
			            }
			        ]
			    },
			    {
			        "featureType": "landscape",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "color": "#000000"
			            },
			            {
			                "lightness": 20
			            }
			        ]
			    },
			    {
			        "featureType": "landscape",
			        "elementType": "geometry.fill",
			        "stylers": [
			            {
			                "color": "#273063"
			            }
			        ]
			    },
			    {
			        "featureType": "landscape",
			        "elementType": "geometry.stroke",
			        "stylers": [
			            {
			                "color": "#273063"
			            }
			        ]
			    },
			    {
			        "featureType": "landscape.natural",
			        "elementType": "geometry.fill",
			        "stylers": [
			            {
			                "color": "#273063"
			            }
			        ]
			    },
			    {
			        "featureType": "poi",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "lightness": 21
			            }
			        ]
			    },
			    {
			        "featureType": "poi",
			        "elementType": "geometry.fill",
			        "stylers": [
			            {
			                "color": "#273063"
			            }
			        ]
			    },
			    {
			        "featureType": "poi",
			        "elementType": "geometry.stroke",
			        "stylers": [
			            {
			                "color": "#4d6059"
			            }
			        ]
			    },
			    {
			        "featureType": "road",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "visibility": "on"
			            },
			            {
			                "color": "#7f8d89"
			            }
			        ]
			    },
			    {
			        "featureType": "road",
			        "elementType": "geometry.fill",
			        "stylers": [
			            {
			                "color": "#181f46"
			            }
			        ]
			    },
			    {
			        "featureType": "road.highway",
			        "elementType": "geometry.fill",
			        "stylers": [
			            {
			                "color": "#181f46"
			            },
			            {
			                "lightness": 17
			            }
			        ]
			    },
			    {
			        "featureType": "road.highway",
			        "elementType": "geometry.stroke",
			        "stylers": [
			            {
			                "color": "#181f46"
			            },
			            {
			                "lightness": 29
			            },
			            {
			                "weight": 0.2
			            }
			        ]
			    },
			    {
			        "featureType": "road.arterial",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "color": "#000000"
			            },
			            {
			                "lightness": 18
			            }
			        ]
			    },
			    {
			        "featureType": "road.arterial",
			        "elementType": "geometry.fill",
			        "stylers": [
			            {
			                "color": "#2f3976"
			            }
			        ]
			    },
			    {
			        "featureType": "road.arterial",
			        "elementType": "geometry.stroke",
			        "stylers": [
			            {
			                "color": "#2f3976"
			            }
			        ]
			    },
			    {
			        "featureType": "road.local",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "color": "#000000"
			            },
			            {
			                "lightness": 16
			            }
			        ]
			    },
			    {
			        "featureType": "road.local",
			        "elementType": "geometry.fill",
			        "stylers": [
			            {
			                "color": "#2f3976"
			            }
			        ]
			    },
			    {
			        "featureType": "road.local",
			        "elementType": "geometry.stroke",
			        "stylers": [
			            {
			                "color": "#2f3976"
			            }
			        ]
			    },
			    {
			        "featureType": "transit",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "color": "#151836"
			            },
			            {
			                "lightness": 19
			            }
			        ]
			    },
			    {
			        "featureType": "water",
			        "elementType": "all",
			        "stylers": [
			            {
			                "color": "#2b3638"
			            },
			            {
			                "visibility": "on"
			            }
			        ]
			    },
			    {
			        "featureType": "water",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "color": "#2b3638"
			            },
			            {
			                "lightness": 17
			            }
			        ]
			    },
			    {
			        "featureType": "water",
			        "elementType": "geometry.fill",
			        "stylers": [
			            {
			                "color": "#181f46"
			            }
			        ]
			    },
			    {
			        "featureType": "water",
			        "elementType": "geometry.stroke",
			        "stylers": [
			            {
			                "color": "#24282b"
			            }
			        ]
			    },
			    {
			        "featureType": "water",
			        "elementType": "labels",
			        "stylers": [
			            {
			                "visibility": "off"
			            }
			        ]
			    },
			    {
			        "featureType": "water",
			        "elementType": "labels.text",
			        "stylers": [
			            {
			                "visibility": "off"
			            }
			        ]
			    },
			    {
			        "featureType": "water",
			        "elementType": "labels.text.fill",
			        "stylers": [
			            {
			                "visibility": "off"
			            }
			        ]
			    },
			    {
			        "featureType": "water",
			        "elementType": "labels.text.stroke",
			        "stylers": [
			            {
			                "visibility": "off"
			            }
			        ]
			    },
			    {
			        "featureType": "water",
			        "elementType": "labels.icon",
			        "stylers": [
			            {
			                "visibility": "off"
			            }
			        ]
			    }
			]
	    };

	    map = new google.maps.Map(document.getElementById('map'), mapOptions);

	    bounds = new google.maps.LatLngBounds();
	    
	    for (i = 0; i < markers.length; i++) {
	        addMarker(markers[i]);
	        loc = new google.maps.LatLng(marker1.position.lat(), marker1.position.lng());
	        bounds.extend(loc);
	    }

	    map.fitBounds(bounds);
	    map.panToBounds(bounds);  

	    var markerClusterStyle = [{
	        url: './assets/images/icons/cluster_pin.png',
	        height: 63,
	        width: 52,
	        textSize: 13,
	        textColor: '#fff',
	        zoomOnClick: false
	    }];
	    var markerCluster = new MarkerClusterer(map, gmarkers, {styles:markerClusterStyle});

	    google.maps.event.addListener(markerCluster, 'clusterclick', function(cluster){
			map.setCenter(cluster.getCenter());
		  	//map.setZoom(map.getZoom()+3);
    	});

		/**
		 * Function to add marker to map
		 */

		function addMarker(marker) {			
			var id = marker.Id;
		    var category = marker.Category;
            var pos = new google.maps.LatLng(marker.Latitude, marker.Longitude);
		    var icon = {
			    url: marker.Pin // url
			};
			var icon2 = {
			    url: marker.Pin2 //url
			};
			var icon_active = {
				url: './assets/images/icons/white_pin.png', // url
			};
			var title = marker.Title;
			var externalLinkText = marker.ExternalLink.Text;
			var externalLinkUrl = marker.ExternalLink.Url;
			var street = marker.Address.Street;
			var town = marker.Address.Town;
			var country = marker.Address.Country;
			var list = marker.List;

		    marker1 = new google.maps.Marker({
		    	id: id,
		        position: pos,
		        category: category,
		        map: map,
		        icon: icon,
		        title: title,
		        externalLinkText: externalLinkText,
		        externalLinkUrl: externalLinkUrl,
		        street: street,
		        town: town,
		        country: country,
		        list: list
		    });

		    gmarkers.push(marker1);


		    marker2 = new google.maps.Marker({
		        icon2: icon2,
		    });
		    marker2.setVisible(false);
		    marker2.setClickable(false);
		    gmarkers2.push(marker2);

		    // Marker click listener
		    google.maps.event.addListener(marker1, 'click', (function (marker1, i) {
		        return function () {

		        	if(!$(infobox).hasClass("active")) {
		        		$(infobox).addClass("active");
		        	}	     

		        	map.panTo(this.getPosition());
		            // map.setZoom(11);

		            $(infoBox).addClass('loading');

		        	for (j = 0; j < gmarkers2.length; j++) {
		        		 gmarkers[j].setIcon(gmarkers2[j].icon2);
				    }
		            marker1.setIcon(icon_active);

                    $(c_title).html(title);
                    $(c_externalLink).attr("href", externalLinkUrl).text(externalLinkText);

                    if (street === "") {
                        infoboxAddress[0].style.visibility = "hidden";
                    }
                    else {
                        infoboxAddress[0].style.visibility = "visible";
                    }
					$(c_address).html(street+"<br>"+town+"<br>"+country);	 
					var items = [];

		            $.each(list , function (index, value) {
						items.push("<li>"+value+"</li>");
					});
                    
                    $(c_list).html("");
                    $(c_list).append(items);       

			        $(infoBox).delay(350).queue(function () {
	                    $(this).removeClass('loading').dequeue();
	                });

	                nicescroll($(".infobox-container"),".infobox-wrapper");

			    }
		    })(marker1, i));
		}

		/**
		 * Function to filter markers by category
		 */

		 var categoriesArr = [];

		filterCategories = function (category) {	
			categoriesArr = [];
			bounds = new google.maps.LatLngBounds();

		    for (i = 0; i < markers.length; i++) {
		        marker = gmarkers[i];
		        // If is same category or category not picked

		        if (marker.category === category || category.length === 0) {
		            categoriesArr.push(marker);
		            // remove's the previous added markerCluster
			        markerCluster.clearMarkers();
			        
				    // rebuild you markers here ...
				    markerCluster.addMarkers(categoriesArr);

				    
				    loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
				    bounds.extend(loc);	        		
		        }
		    }

		    map.fitBounds(bounds);
    		map.panToBounds(bounds); 
		}

		/**
		 * Function to reset categories
		 */

		resetFilters = function() {
			categoriesArr = [];
			bounds = new google.maps.LatLngBounds();

		    for (i = 0; i < markers.length; i++) {
		        marker = gmarkers[i];
		        // If is same category or category not picked
	            categoriesArr.push(marker);
	            // remove's the previous added markerCluster
		        markerCluster.clearMarkers();
		        
			    // rebuild you markers here ...
			    markerCluster.addMarkers(categoriesArr);

			    loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
				bounds.extend(loc);	 
		    }

		    map.fitBounds(bounds);
    		map.panToBounds(bounds); 
		}

		filters();
		closeInfobox();

		function filters() {
			$(".map .ip-buttons .ipBtn").click(function(e) {
				e.preventDefault();

				$(".map .ip-buttons .ipBtn").removeClass("active");
				$(this).addClass("active");

				if($(this).hasClass("reset")) {
					resetFilters();
				} else {
					filterCategories($(this).data("category"));
				}    
			});
		}

	    function closeInfobox() {
			$(infobox).find(".close-infobox-btn").click(function() {
				for (j = 0; j < gmarkers2.length; j++) {
	        		 gmarkers[j].setIcon(gmarkers2[j].icon2);
			    }
				$(infobox).removeClass("active");   
			});
		}
	}
}