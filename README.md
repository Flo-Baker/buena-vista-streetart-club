# buena-vista-streetart-club

Project Module 2 - Building Web App (Buena Vista Street Art Club)
Pair Coding |  Flo-Baker & Emballeur

## Description

A street art database - since this art form always disappears again more or less quickly, but you can also observe the medium-sized artists "traveling", it would be nice to make this art available for longer / for a broader audience - and as well give their "fans" something at hand. Especially because these artists often work in the dark, it would be great to record their works and make them digitally accessible. This means homepage is like a gallery, you can search via artist oder via city, if one creates the profile to add even "sighted artworks" with artist name, type of art, "underground" city & country with map / geotag. One could add then also comment function / and or Likes. Relations would be the artists and the cities. Add on could be e.g. a c215 walk in my city

## MVP

-
- Wireframes: https://www.figma.com/file/cIPc0nrZRuKr48VGlDR3pD/bvSAC-by-Flo-and-Sina?node-id=0%3A1

## Backlog

- Geodata | Integration of Maps

## Data Structure

index (“ / “)
= home - router.get

    authRoutes (“ /auth “)
    - signup (‘ /signup ‘) - erledigt
    	- router.get & router.post
    - login (‘ /login ’) - erledigt
    	- router.get & router.post
    - logout (‘ /logout ’) - erledigt
    	- router.get

    profileRoutes (“ /profile “)
    - router.get

    -> loggedIn = res.render(‘ profile/details ’), {middleware}
    -> != loggedIn = res.redirect(‘ authRoutes/login ’)

    artworkRoutes (“ /artworks/overview ”)
    - artwork (‘ /overview ’)
    	- router.get - done

    - artwork-list (‘ artworks/list ’)
    	- router.get - done
    			- artwork-list/upload (‘ artworks/upload ’)
    					-router.get & router.post

    - artwork-details (‘ /details/:id ’)
    	- router.get

    			- artwork-list/update (‘ artworks/:artworkId/update ’)
    					- router.get & router.post
    			-artwork-list/delete (‘ artworks/:artworkid/delete ’)
    					- router.post

——————— - artistRoutes (“ /artist ”) - artist-list (‘ /list ’) - router.get - artist-details (‘ /details ’) - router.get - artist-details (‘ /details:id ’) - artist-create (‘ /create’)

## Tasks

in order of priority

##Links

- BG Image: https://unsplash.com/photos/I0238w5OesU by @lgtts

- Graffiti Image: https://unsplash.com/photos/pDJKy-5r9p0 by @london77

- Mosaic Image: https://unsplash.com/photos/cNVO-8JhgAg by @thevoncomplex

- Mosaic DB Image: https://unsplash.com/photos/fmhzFlA-jc0 by @larry_rw

- Paper Work Image: https://unsplash.com/photos/RzIDFfMXQ_A by @aleyna22

- Stencil Image: https://unsplash.com/photos/xfekW601_tQ @simplicity
- Urban Knitting Image: https://unsplash.com/photos/prh26chtvYc @ cherrykicks

- Sources Streetart:
- https://www.stadtkindfrankfurt.de/mata-haarig-strickguerilla-greetings-from-big-brother/ & https://www.facebook.com/Mata-Haarig-Strickguerilla-444034785614460/about/?ref=page_internal, https://www.space-invaders.com/about/
