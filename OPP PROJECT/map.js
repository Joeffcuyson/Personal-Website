// ============================================
// INTERACTIVE MAP MODULE
// ============================================

(function() {
    'use strict';
    
    // Your home coordinates
    const HOME_LOCATION = {
        lat: 14.749424220917383,
        lng: 121.14787538765499
    };
    
    let map;
    let homeMarker;
    let customMarkers = [];
    let measurementMode = false;
    let measurementMarkers = [];
    let measurementLine = null;
    let infoWindows = [];
    
    // Initialize map when DOM is ready
    function initMap() {
        // Create map centered on your home
        map = new google.maps.Map(document.getElementById('map'), {
            center: HOME_LOCATION,
            zoom: 18, // Higher zoom for better detail
            mapTypeId: 'hybrid', // Start with satellite + labels
            styles: [], // Remove dark theme to show satellite imagery properly
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.TOP_RIGHT,
                mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain']
            },
            streetViewControl: true,
            streetViewControlOptions: {
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            },
            fullscreenControl: true,
            fullscreenControlOptions: {
                position: google.maps.ControlPosition.RIGHT_TOP
            },
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER
            },
            scaleControl: true, // Shows scale bar
            rotateControl: true, // Allows rotation in satellite view
            tilt: 45, // 3D tilt for buildings in satellite view
            // High quality rendering
            gestureHandling: 'greedy',
            clickableIcons: true
        });
        
        // Add home marker (permanent)
        addHomeMarker();
        
        // Setup button controls
        setupControls();
        
        console.log('✅ Interactive map initialized!');
    }
    
    // Add permanent home marker
    function addHomeMarker() {
        homeMarker = new google.maps.Marker({
            position: HOME_LOCATION,
            map: map,
            title: '🏠 My Home',
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 15,
                fillColor: '#FF6B6B',
                fillOpacity: 1,
                strokeColor: '#fff',
                strokeWeight: 3
            },
            animation: google.maps.Animation.DROP
        });
        
        const homeInfoWindow = new google.maps.InfoWindow({
            content: `
                <div class="custom-info-window">
                    <h3>🏠 My Home</h3>
                    <p><strong>South Ville 8b</strong></p>
                    <p>Rodriguez, Rizal, Philippines</p>
                    <p><small>Lat: ${HOME_LOCATION.lat.toFixed(6)}<br>
                    Lng: ${HOME_LOCATION.lng.toFixed(6)}</small></p>
                </div>
            `
        });
        
        homeMarker.addListener('click', () => {
            closeAllInfoWindows();
            homeInfoWindow.open(map, homeMarker);
        });
        
        infoWindows.push(homeInfoWindow);
    }
    
    // Setup control buttons
    function setupControls() {
        const addMarkerBtn = document.getElementById('addMarkerBtn');
        const measureBtn = document.getElementById('measureDistanceBtn');
        const clearBtn = document.getElementById('clearMarkersBtn');
        const resetBtn = document.getElementById('resetMapBtn');
        const satelliteBtn = document.getElementById('satelliteViewBtn');
        const roadmapBtn = document.getElementById('roadmapViewBtn');
        const terrainBtn = document.getElementById('terrainViewBtn');
        
        // Map view toggles
        satelliteBtn.addEventListener('click', () => {
            map.setMapTypeId('hybrid'); // Satellite with labels
            updateViewButtons(satelliteBtn);
        });
        
        roadmapBtn.addEventListener('click', () => {
            map.setMapTypeId('roadmap');
            updateViewButtons(roadmapBtn);
        });
        
        terrainBtn.addEventListener('click', () => {
            map.setMapTypeId('terrain');
            updateViewButtons(terrainBtn);
        });
        
        // Add marker mode
        addMarkerBtn.addEventListener('click', () => {
            toggleMeasurementMode(false);
            addMarkerBtn.classList.toggle('active');
            
            if (addMarkerBtn.classList.contains('active')) {
                map.setOptions({ draggableCursor: 'crosshair' });
                alert('Click on the map to add a marker. You\'ll be prompted to name it!');
            } else {
                map.setOptions({ draggableCursor: null });
            }
        });
        
        // Measurement mode
        measureBtn.addEventListener('click', () => {
            addMarkerBtn.classList.remove('active');
            map.setOptions({ draggableCursor: null });
            toggleMeasurementMode(!measurementMode);
        });
        
        // Clear all custom markers
        clearBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all custom markers?')) {
                clearAllMarkers();
            }
        });
        
        // Reset map to home
        resetBtn.addEventListener('click', () => {
            map.setCenter(HOME_LOCATION);
            map.setZoom(18);
        });
        
        // Map click event for adding markers
        map.addListener('click', (event) => {
            const addBtn = document.getElementById('addMarkerBtn');
            
            if (addBtn.classList.contains('active')) {
                addCustomMarker(event.latLng);
                addBtn.classList.remove('active');
                map.setOptions({ draggableCursor: null });
            } else if (measurementMode) {
                addMeasurementPoint(event.latLng);
            }
        });
    }
    
    // Update view button active state
    function updateViewButtons(activeBtn) {
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }
    
    // Add custom marker with user input
    function addCustomMarker(location) {
        const name = prompt('Enter a name for this location:', 'New Place');
        if (!name) return;
        
        const description = prompt('Add a description (optional):', '');
        
        const marker = new google.maps.Marker({
            position: location,
            map: map,
            title: name,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 12,
                fillColor: '#1DE9B6',
                fillOpacity: 1,
                strokeColor: '#fff',
                strokeWeight: 2
            },
            animation: google.maps.Animation.DROP
        });
        
        // Calculate distance from home
        const distance = google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(HOME_LOCATION),
            location
        );
        
        const distanceKm = (distance / 1000).toFixed(2);
        const distanceM = distance.toFixed(0);
        
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div class="custom-info-window">
                    <h3>📍 ${name}</h3>
                    ${description ? `<p>${description}</p>` : ''}
                    <p><strong>Distance from home:</strong><br>
                    ${distanceKm} km (${distanceM} m)</p>
                    <p><small>Lat: ${location.lat().toFixed(6)}<br>
                    Lng: ${location.lng().toFixed(6)}</small></p>
                    <button class="delete-marker-btn" onclick="deleteMarker(${customMarkers.length})">
                        🗑️ Delete
                    </button>
                </div>
            `
        });
        
        marker.addListener('click', () => {
            closeAllInfoWindows();
            infoWindow.open(map, marker);
        });
        
        customMarkers.push({ marker, infoWindow, name, description, location });
        infoWindows.push(infoWindow);
    }
    
    // Toggle measurement mode
    function toggleMeasurementMode(enable) {
        measurementMode = enable;
        const measureBtn = document.getElementById('measureDistanceBtn');
        
        if (enable) {
            measureBtn.classList.add('active');
            clearMeasurement();
            map.setOptions({ draggableCursor: 'crosshair' });
            alert('Click two points on the map to measure distance!');
        } else {
            measureBtn.classList.remove('active');
            clearMeasurement();
            map.setOptions({ draggableCursor: null });
        }
    }
    
    // Add measurement point
    function addMeasurementPoint(location) {
        if (measurementMarkers.length >= 2) {
            clearMeasurement();
        }
        
        const marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: '#FFD700',
                fillOpacity: 1,
                strokeColor: '#fff',
                strokeWeight: 2
            },
            label: {
                text: (measurementMarkers.length + 1).toString(),
                color: '#000',
                fontWeight: 'bold'
            }
        });
        
        measurementMarkers.push(marker);
        
        if (measurementMarkers.length === 2) {
            drawMeasurementLine();
            displayDistance();
        }
    }
    
    // Draw line between measurement points
    function drawMeasurementLine() {
        const path = [
            measurementMarkers[0].getPosition(),
            measurementMarkers[1].getPosition()
        ];
        
        measurementLine = new google.maps.Polyline({
            path: path,
            strokeColor: '#FFD700',
            strokeOpacity: 1.0,
            strokeWeight: 3,
            map: map
        });
    }
    
    // Display distance between measurement points
    function displayDistance() {
        const distance = google.maps.geometry.spherical.computeDistanceBetween(
            measurementMarkers[0].getPosition(),
            measurementMarkers[1].getPosition()
        );
        
        const distanceKm = (distance / 1000).toFixed(2);
        const distanceM = distance.toFixed(0);
        
        alert(`Distance: ${distanceKm} km (${distanceM} meters)`);
    }
    
    // Clear measurement
    function clearMeasurement() {
        measurementMarkers.forEach(marker => marker.setMap(null));
        measurementMarkers = [];
        
        if (measurementLine) {
            measurementLine.setMap(null);
            measurementLine = null;
        }
    }
    
    // Clear all custom markers
    function clearAllMarkers() {
        customMarkers.forEach(item => {
            item.marker.setMap(null);
            item.infoWindow.close();
        });
        customMarkers = [];
        clearMeasurement();
    }
    
    // Delete specific marker
    window.deleteMarker = function(index) {
        if (customMarkers[index]) {
            customMarkers[index].marker.setMap(null);
            customMarkers[index].infoWindow.close();
            customMarkers.splice(index, 1);
        }
    };
    
    // Close all info windows
    function closeAllInfoWindows() {
        infoWindows.forEach(iw => iw.close());
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMap);
    } else {
        initMap();
    }
    
})();
