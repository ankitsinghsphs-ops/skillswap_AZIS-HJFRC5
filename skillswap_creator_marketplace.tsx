import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, Filter, PlusCircle, Sparkles, CheckCircle2, XCircle, Clock, 
  ArrowRight, ShieldCheck, Zap, AlertTriangle, RefreshCw, Star, 
  Briefcase, User, DollarSign, Calendar, Info, Layers, ChevronRight,
  TrendingUp, Users, HeartHandshake, Eye, ExternalLink, MessageSquare,
  BadgeCheck, Settings, BookOpen, ThumbsUp, Send, Check
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Short-Form Video',
  'Thumbnail & Graphic Design',
  'Scriptwriting & Hooks',
  'UGC & Content Creation',
  'Notion & Creator Ops',
  'AI & Voice Avatars'
];

const DECLINE_REASONS = [
  { id: 'capacity', label: 'At maximum weekly capacity', help: 'Recommend client to your waitlist or peer creator.' },
  { id: 'scope', label: 'Scope mismatch / outside expertise', help: 'Client will be invited to adjust brief requirements.' },
  { id: 'timeline', label: 'Requested deadline is too tight', help: 'Client can propose an extended delivery date.' },
  { id: 'budget', label: 'Budget/scope ratio misaligned', help: 'Client can upgrade or renegotiate scope.' }
];

const INITIAL_GIGS = [
  {
    id: 'gig-1',
    creatorId: 'c1',
    creatorName: 'Kai Vance',
    creatorAge: 19,
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    verified: true,
    title: 'Viral TikTok & IG Reels Editing with Alex Hormozi Style Captions',
    category: 'Short-Form Video',
    description: 'Pacing, SFX, color grading, motion graphics, and high-retention subtitling designed to maximize watch time on Shorts & Reels.',
    rate: 65,
    pricingType: 'project',
    deliveryDays: 2,
    rating: 4.95,
    reviewsCount: 38,
    tags: ['Reels', 'CapCut', 'Retention', 'Shorts'],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
    responseRate: 98,
    responseTimeHours: 1.2,
    completedJobs: 42,
    maxConcurrentBookings: 3,
    activeBookingsCount: 1,
    fairRotationBoostActive: true
  },
  {
    id: 'gig-2',
    creatorId: 'c2',
    creatorName: 'Sienna Ray',
    creatorAge: 21,
    creatorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    verified: true,
    title: 'High-CTR YouTube 3D & Collage Thumbnails That Convert',
    category: 'Thumbnail & Graphic Design',
    description: 'Custom 3D model renders, expressive facial cutouts, vivid lighting, and A/B tested title typography crafted for high click-through rates.',
    rate: 45,
    pricingType: 'project',
    deliveryDays: 1,
    rating: 4.88,
    reviewsCount: 64,
    tags: ['Thumbnails', 'Photoshop', 'Blender', 'YouTube'],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 12,
    responseRate: 94,
    responseTimeHours: 2.8,
    completedJobs: 71,
    maxConcurrentBookings: 4,
    activeBookingsCount: 2,
    fairRotationBoostActive: false
  },
  {
    id: 'gig-3',
    creatorId: 'c3',
    creatorName: 'Devon Patel',
    creatorAge: 20,
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    verified: true,
    title: 'High-Retention TikTok Scriptwriting & 3-Second Hooks',
    category: 'Scriptwriting & Hooks',
    description: 'Stop the scroll! 5 researched script concepts complete with opening audio-visual hooks, narrative arcs, and organic calls to action.',
    rate: 55,
    pricingType: 'project',
    deliveryDays: 2,
    rating: 4.91,
    reviewsCount: 29,
    tags: ['Scriptwriting', 'Hooks', 'TikTok', 'Copywriting'],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1, // New creator boost
    responseRate: 100,
    responseTimeHours: 0.8,
    completedJobs: 15,
    maxConcurrentBookings: 2,
    activeBookingsCount: 0,
    fairRotationBoostActive: true
  },
  {
    id: 'gig-4',
    creatorId: 'c4',
    creatorName: 'Amara Chen',
    creatorAge: 18,
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    verified: true,
    title: 'Authentic Gen-Z UGC Video Content & Product Reviews',
    category: 'UGC & Content Creation',
    description: 'Raw, native, candid product showcases shot in 4K on iPhone 15 Pro. Perfect for organic brand pages and high-performing Spark Ads.',
    rate: 110,
    pricingType: 'project',
    deliveryDays: 3,
    rating: 4.98,
    reviewsCount: 52,
    tags: ['UGC', 'TikTok Ads', 'Product Demo', 'Lifestyle'],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 20,
    responseRate: 96,
    responseTimeHours: 2.1,
    completedJobs: 58,
    maxConcurrentBookings: 3,
    activeBookingsCount: 3,
    fairRotationBoostActive: false
  },
  {
    id: 'gig-5',
    creatorId: 'c5',
    creatorName: 'Leo Alvarez',
    creatorAge: 22,
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    verified: false,
    title: 'Custom Notion Creator Operating System & Sponsorship Tracker',
    category: 'Notion & Creator Ops',
    description: 'Complete multi-platform content calendar, brand deal invoicing pipe, and automated asset library tailored specifically for independent creators.',
    rate: 80,
    pricingType: 'project',
    deliveryDays: 2,
    rating: 4.75,
    reviewsCount: 14,
    tags: ['Notion', 'Workflow', 'Productivity', 'Creator Ops'],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    responseRate: 89,
    responseTimeHours: 4.5,
    completedJobs: 11,
    maxConcurrentBookings: 2,
    activeBookingsCount: 0,
    fairRotationBoostActive: true
  }
];

const INITIAL_BOOKINGS = [
  {
    id: 'BK-8921',
    gigId: 'gig-1',
    gigTitle: 'Viral TikTok & IG Reels Editing with Alex Hormozi Style Captions',
    creatorId: 'c1',
    creatorName: 'Kai Vance',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    clientName: 'Liam Drake (Brand Lead)',
    clientEmail: 'liam@hypewave.io',
    brief: 'Need 3 raw podcasts clips edited with dynamic zooms, sound effects, and color-coded subtitles. Raw files in Dropbox link.',
    requestedDeliveryDays: 2,
    price: 65,
    platformFee: 6.5,
    totalPaid: 71.5,
    status: 'Pending', // Pending | Accepted | Declined | Completed
    submittedAt: 'Today, 2:15 PM',
    declineReason: null,
    declineNote: null,
    kickoffNote: null
  },
  {
    id: 'BK-7742',
    gigId: 'gig-2',
    gigTitle: 'High-CTR YouTube 3D & Collage Thumbnails That Convert',
    creatorId: 'c2',
    creatorName: 'Sienna Ray',
    creatorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    clientName: 'Elena Rostova',
    clientEmail: 'elena@vloghub.com',
    brief: 'Finance vlog titled "I Tested 7 Side Hustles for 30 Days". High contrast background with neon greens.',
    requestedDeliveryDays: 1,
    price: 45,
    platformFee: 4.5,
    totalPaid: 49.5,
    status: 'Accepted',
    submittedAt: 'Yesterday, 4:20 PM',
    declineReason: null,
    declineNote: null,
    kickoffNote: 'Hey Elena! Assets downloaded. Starting on the 3D typography render right now. Expect draft by 6 PM.'
  },
  {
    id: 'BK-6210',
    gigId: 'gig-4',
    gigTitle: 'Authentic Gen-Z UGC Video Content & Product Reviews',
    creatorId: 'c4',
    creatorName: 'Amara Chen',
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    clientName: 'Samira Gomez',
    clientEmail: 'samira@glowupcosmetics.co',
    brief: 'Send raw 60-second skincare unboxing video. Must feature natural daylight and close-up skin application.',
    requestedDeliveryDays: 3,
    price: 110,
    platformFee: 11.0,
    totalPaid: 121.0,
    status: 'Declined',
    submittedAt: 'Sep 16, 2026',
    declineReason: 'At maximum weekly capacity',
    declineNote: 'Super sorry Samira! I have 3 live brand sprints locked in this week and want to ensure top quality. I will open new slots next Tuesday.',
    kickoffNote: null
  }
];

export default function App() {
  // Navigation & Role State
  const [activeTab, setActiveTab] = useState('marketplace'); // marketplace | creator-dashboard | my-bookings
  const [userRole, setUserRole] = useState('client'); // 'client' | 'creator'
  
  // Data State
  const [gigs, setGigs] = useState(INITIAL_GIGS);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('recommended'); // recommended | newest | price_asc | rating | fast

  // Interactive Modals State
  const [selectedGigForBooking, setSelectedGigForBooking] = useState(null);
  const [isPostGigModalOpen, setIsPostGigModalOpen] = useState(false);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);
  const [decliningBookingId, setDecliningBookingId] = useState(null);
  const [acceptingBookingId, setAcceptingBookingId] = useState(null);
  const [rebookingTarget, setRebookingTarget] = useState(null);

  // Success Notification Banner
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Hybrid Meritocratic Fair-Rotation formula
  const calculateRankingScore = (gig) => {
    const ageInDays = (Date.now() - gig.createdAt) / (1000 * 60 * 60 * 24);
    // 1. Response & Acceptance reliability (weight: 35%)
    const reliabilityScore = (gig.responseRate / 100) * 35;
    // 2. Client Reviews & Rating satisfaction (weight: 25%)
    const reviewScore = ((gig.rating - 4.0) / 1.0) * 25; // scaled 4.0 - 5.0
    // 3. Fair-Rotation & New Creator Discovery Boost (weight: 25%)
    // New creators (under 7 days) receive a 25 pt fresh-talent spotlight boost
    const rotationBoost = ageInDays <= 5 || gig.fairRotationBoostActive ? 25 : 8;
    // 4. Price Accessibility & Value (weight: 15%)
    const priceAffordability = Math.max(0, (150 - gig.rate) / 150) * 15;

    return Math.round(reliabilityScore + reviewScore + rotationBoost + priceAffordability);
  };

  // Filter & Sort Gigs
  const filteredGigs = useMemo(() => {
    let list = gigs.filter((gig) => {
      const matchesCategory = selectedCategory === 'All' || gig.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        gig.title.toLowerCase().includes(q) ||
        gig.creatorName.toLowerCase().includes(q) ||
        gig.description.toLowerCase().includes(q) ||
        gig.tags.some(t => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });

    // Ranking Logic
    switch (sortBy) {
      case 'recommended':
        return list.sort((a, b) => calculateRankingScore(b) - calculateRankingScore(a));
      case 'newest':
        return list.sort((a, b) => b.createdAt - a.createdAt);
      case 'price_asc':
        return list.sort((a, b) => a.rate - b.rate);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'fast':
        return list.sort((a, b) => a.deliveryDays - b.deliveryDays);
      default:
        return list;
    }
  }, [gigs, searchQuery, selectedCategory, sortBy]);

  const handleCreateBooking = (bookingData) => {
    const newBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      gigId: bookingData.gig.id,
      gigTitle: bookingData.gig.title,
      creatorId: bookingData.gig.creatorId,
      creatorName: bookingData.gig.creatorName,
      creatorAvatar: bookingData.gig.creatorAvatar,
      clientName: bookingData.clientName || 'You (Client Account)',
      clientEmail: bookingData.clientEmail || 'you@creatorbrand.io',
      brief: bookingData.brief,
      requestedDeliveryDays: bookingData.gig.deliveryDays,
      price: bookingData.gig.rate,
      platformFee: Math.round(bookingData.gig.rate * 0.10 * 10) / 10,
      totalPaid: Math.round((bookingData.gig.rate * 1.10) * 10) / 10,
      status: 'Pending',
      submittedAt: 'Just now',
      declineReason: null,
      declineNote: null,
      kickoffNote: null
    };

    setBookings([newBooking, ...bookings]);
    setSelectedGigForBooking(null);
    showToast(`🎉 Booking requested! Creator ${bookingData.gig.creatorName} has 24h to review.`);
    setActiveTab('my-bookings');
  };

  const handleAcceptBooking = (bookingId, kickoffNote) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'Accepted',
          kickoffNote: kickoffNote || 'Looking forward to collaborating! Work has commenced.'
        };
      }
      return b;
    }));
    setAcceptingBookingId(null);
    showToast('🚀 Booking accepted! Client notified and project workspace generated.');
  };

  const handleDeclineBooking = (bookingId, reason, note) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'Declined',
          declineReason: reason,
          declineNote: note || 'Creator is unable to accept this request at this time.'
        };
      }
      return b;
    }));
    setDecliningBookingId(null);
    showToast('Decline processed. Client funds released instantly and alternative matches offered.');
  };

  const handlePostNewGig = (newGigData) => {
    const newGig = {
      id: `gig-${Date.now()}`,
      creatorId: 'c-curr',
      creatorName: newGigData.creatorName || 'Alex Rivers',
      creatorAge: Number(newGigData.creatorAge) || 21,
      creatorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      verified: true,
      title: newGigData.title,
      category: newGigData.category,
      description: newGigData.description,
      rate: Number(newGigData.rate),
      pricingType: newGigData.pricingType || 'project',
      deliveryDays: Number(newGigData.deliveryDays) || 2,
      rating: 5.0,
      reviewsCount: 0,
      tags: newGigData.tags.split(',').map(t => t.trim()).filter(Boolean),
      createdAt: Date.now(),
      responseRate: 100,
      responseTimeHours: 1.0,
      completedJobs: 0,
      maxConcurrentBookings: Number(newGigData.maxConcurrentBookings) || 3,
      activeBookingsCount: 0,
      fairRotationBoostActive: true
    };

    setGigs([newGig, ...gigs]);
    setIsPostGigModalOpen(false);
    showToast('✨ Your new gig is live with a 48-Hour Fair Rotation front-page boost!');
    setActiveTab('marketplace');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-5 py-3 rounded-xl shadow-2xl border border-indigo-400/30 animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-300 shrink-0" />
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
      )}

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Platform Tag */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('marketplace')}
              className="flex items-center gap-2 group text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                ⚡
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-indigo-100 to-purple-300 bg-clip-text text-transparent">
                  SkillSwap
                </span>
                <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
                  Young Creator Economy
                </span>
              </div>
            </button>
          </div>

          {/* Primary View Navigation */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('marketplace')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'marketplace'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              Marketplace
            </button>

            <button
              onClick={() => setActiveTab('creator-dashboard')}
              className={`px-3 py-2 rounded-lg text-sm font-medium relative transition-all ${
                activeTab === 'creator-dashboard'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              Creator Studio
              {bookings.filter(b => b.status === 'Pending').length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 text-[10px] font-bold bg-amber-400 text-slate-950 rounded-full">
                  {bookings.filter(b => b.status === 'Pending').length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('my-bookings')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'my-bookings'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              My Bookings
              {bookings.length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 text-[10px] font-bold bg-slate-700 text-slate-300 rounded-full">
                  {bookings.length}
                </span>
              )}
            </button>
          </nav>

          {/* Action CTAs & Marketplace Architecture Hub */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsArchitectureModalOpen(true)}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-indigo-300 border border-indigo-900/50 transition-colors"
              title="View how SkillSwap solves Declines, Concurrency, and Fair Ranking"
            >
              <Info className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden md:inline">Platform Economics</span>
            </button>

            <button
              onClick={() => setIsPostGigModalOpen(true)}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List a Gig</span>
            </button>
          </div>
        </div>
      </header>

      {}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'marketplace' && (
          <MarketplaceView 
            gigs={filteredGigs}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onBookGig={(gig) => setSelectedGigForBooking(gig)}
            onOpenArchitectureModal={() => setIsArchitectureModalOpen(true)}
          />
        )}

        {activeTab === 'creator-dashboard' && (
          <CreatorDashboardView 
            bookings={bookings}
            gigs={gigs}
            onAcceptBooking={(id) => setAcceptingBookingId(id)}
            onDeclineBooking={(id) => setDecliningBookingId(id)}
            onPostNewGig={() => setIsPostGigModalOpen(true)}
          />
        )}

        {activeTab === 'my-bookings' && (
          <ClientBookingsView 
            bookings={bookings}
            gigs={gigs}
            onFindAlternative={(declinedBooking) => {
              const matchedGigs = gigs.filter(g => g.id !== declinedBooking.gigId);
              setRebookingTarget({ booking: declinedBooking, alternatives: matchedGigs });
            }}
            onBookAlternativeGig={(gig) => {
              setSelectedGigForBooking(gig);
              setRebookingTarget(null);
            }}
          />
        )}
      </main>

      {}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/60 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">SkillSwap</span> — Empowering the next generation of digital creators to build sustainable freelance micro-agencies.
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsArchitectureModalOpen(true)}
              className="hover:text-indigo-400 underline underline-offset-2 transition-colors"
            >
              Economics & Fairness Protocol
            </button>
            <span>Escrow Protected</span>
            <span>Zero Exploitative Bidding</span>
          </div>
        </div>
      </footer>

      {}
      {/* 1. Book Gig Modal */}
      {selectedGigForBooking && (
        <BookGigModal 
          gig={selectedGigForBooking} 
          onClose={() => setSelectedGigForBooking(null)}
          onSubmit={handleCreateBooking}
        />
      )}

      {/* 2. Post Gig Modal */}
      {isPostGigModalOpen && (
        <PostGigModal 
          onClose={() => setIsPostGigModalOpen(false)}
          onSubmit={handlePostNewGig}
        />
      )}

      {/* 3. Accept Booking Modal */}
      {acceptingBookingId && (
        <AcceptBookingModal 
          booking={bookings.find(b => b.id === acceptingBookingId)}
          onClose={() => setAcceptingBookingId(null)}
          onConfirm={(note) => handleAcceptBooking(acceptingBookingId, note)}
        />
      )}

      {/* 4. Decline Booking Modal */}
      {decliningBookingId && (
        <DeclineBookingModal 
          booking={bookings.find(b => b.id === decliningBookingId)}
          onClose={() => setDecliningBookingId(null)}
          onConfirm={(reason, note) => handleDeclineBooking(decliningBookingId, reason, note)}
        />
      )}

      {/* 5. Alternative Creator Re-Match Drawer */}
      {rebookingTarget && (
        <AlternativeMatchesModal 
          rebookingTarget={rebookingTarget}
          onClose={() => setRebookingTarget(null)}
          onSelectGig={(altGig) => {
            setRebookingTarget(null);
            setSelectedGigForBooking(altGig);
          }}
        />
      )}

      {/* 6. Architecture & Platform Economics Modal */}
      {isArchitectureModalOpen && (
        <ArchitectureExplainerModal 
          onClose={() => setIsArchitectureModalOpen(false)} 
        />
      )}

    </div>
  );
}

function MarketplaceView({ 
  gigs, 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory, 
  sortBy, 
  setSortBy, 
  onBookGig,
  onOpenArchitectureModal
}) {
  return (
    <div className="space-y-6">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950/70 via-slate-900 to-purple-950/70 border border-indigo-900/40 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Verified Gen-Z & Young Creator Talent
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Hire native digital creators who actually understand the modern feed.
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            Directly contract viral video editors, high-CTR thumbnail artists, UGC storytellers, and automation builders with clear deliverables and non-custodial escrow.
          </p>
          
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" /> Fixed, transparent rates
            </span>
            <span className="flex items-center gap-1 text-indigo-300">
              <ShieldCheck className="w-4 h-4" /> 100% Escrow Hold Protection
            </span>
            <span className="flex items-center gap-1 text-purple-300">
              <Zap className="w-4 h-4" /> Fast 24-48h Delivery Available
            </span>
          </div>
        </div>

        {/* Decorative Background Glows */}
        <div className="absolute right-0 top-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-20 bottom-0 w-48 h-48 rounded-full bg-purple-500/10 blur-2xl pointer-events-none" />
      </div>

      {/* Search Bar & Ranking Strategy Strip */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by gig title, creator, skill tags (e.g., 'CapCut', 'Blender', 'Hooks')..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <label className="text-xs text-slate-400 whitespace-nowrap">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="recommended">Fair-Rotation Algorithm (Recommended)</option>
            <option value="newest">Newest Listed</option>
            <option value="price_asc">Lowest Starting Rate</option>
            <option value="rating">Highest Rated</option>
            <option value="fast">Fastest Delivery Time</option>
          </select>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-850 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Algorithmic Fairness Context Banner */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 flex items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>SkillSwap Meritocratic Ranking Engine:</strong> Combining fast response rates (35%), verified reviews (25%), and our anti-monopoly <strong>Fair-Rotation Boost (25%)</strong> ensuring new creators get equal homepage visibility.
          </span>
        </div>
        <button 
          onClick={onOpenArchitectureModal}
          className="text-indigo-400 hover:text-indigo-300 whitespace-nowrap underline shrink-0 font-medium"
        >
          Why this matters →
        </button>
      </div>

      {/* Marketplace Grid */}
      {gigs.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-dashed border-slate-800">
          <Briefcase className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-300">No creator gigs found</h3>
          <p className="text-xs text-slate-500 mt-1">Try relaxing your search terms or choosing a different category.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="mt-4 px-4 py-2 rounded-lg bg-indigo-600/20 text-indigo-300 text-xs font-medium hover:bg-indigo-600/30"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {gigs.map((gig) => (
            <GigCard 
              key={gig.id} 
              gig={gig} 
              onBook={() => onBookGig(gig)} 
            />
          ))}
        </div>
      )}

    </div>
  );
}

function GigCard({ gig, onBook }) {
  const isAvailable = gig.activeBookingsCount < gig.maxConcurrentBookings;

  return (
    <div className="bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:shadow-indigo-950/20 group">
      
      {/* Creator Profile Header */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <img 
                src={gig.creatorAvatar} 
                alt={gig.creatorName}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20 group-hover:ring-indigo-500/50 transition-all" 
              />
              {gig.verified && (
                <span className="absolute -bottom-1 -right-1 bg-indigo-500 text-white rounded-full p-0.5" title="Verified Young Creator">
                  <BadgeCheck className="w-3 h-3" />
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-slate-200">{gig.creatorName}</span>
                <span className="text-[11px] text-slate-400 font-medium px-1.5 py-0.5 bg-slate-800 rounded">
                  {gig.creatorAge}y/o
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span className="font-semibold text-slate-200">{gig.rating}</span>
                <span>({gig.reviewsCount} reviews)</span>
              </div>
            </div>
          </div>

          {/* Dynamic Rotation Badge */}
          {gig.fairRotationBoostActive && (
            <span className="text-[10px] font-semibold text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Fair Boost
            </span>
          )}
        </div>

        {/* Category & Title */}
        <span className="text-[11px] font-medium text-indigo-400 uppercase tracking-wider">
          {gig.category}
        </span>
        <h3 className="text-base font-bold text-white mt-1 line-clamp-2 group-hover:text-indigo-200 transition-colors">
          {gig.title}
        </h3>

        {/* Description Snippet */}
        <p className="mt-2 text-xs text-slate-400 line-clamp-3 leading-relaxed">
          {gig.description}
        </p>

        {/* Skill Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {gig.tags.map((tag) => (
            <span key={tag} className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer: Turnaround, Pricing & Action */}
      <div className="mt-5 pt-4 border-t border-slate-800/80">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{gig.deliveryDays} day{gig.deliveryDays > 1 ? 's' : ''} delivery</span>
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            <span>
              {isAvailable ? `${gig.maxConcurrentBookings - gig.activeBookingsCount} slots open` : 'Queue Active'}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-500 block">Starting from</span>
            <div className="text-lg font-extrabold text-white">
              ${gig.rate}
              <span className="text-xs font-normal text-slate-400">/{gig.pricingType}</span>
            </div>
          </div>

          <button
            onClick={onBook}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 flex items-center gap-1.5"
          >
            <span>Book Gig</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
}

function CreatorDashboardView({ bookings, gigs, onAcceptBooking, onDeclineBooking, onPostNewGig }) {
  const [dashboardTab, setDashboardTab] = useState('pending'); // pending | active | declined | all-gigs

  // Derived Creator metrics
  const pendingRequests = bookings.filter(b => b.status === 'Pending');
  const activeBookings = bookings.filter(b => b.status === 'Accepted');
  const declinedBookings = bookings.filter(b => b.status === 'Declined');
  
  const totalEarned = activeBookings.reduce((sum, b) => sum + b.price, 0);
  const pendingRevenue = pendingRequests.reduce((sum, b) => sum + b.price, 0);

  return (
    <div className="space-y-6">
      
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white">Creator Studio & Queue Management</h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live Escrow
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Accept or decline incoming requests quickly to safeguard your high response-rate ranking boost.
          </p>
        </div>

        <button
          onClick={onPostNewGig}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Service Offering</span>
        </button>
      </div>

      {/* Financial Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Total Cleared Earnings</span>
            <div className="text-2xl font-black text-white mt-0.5">${totalEarned}</div>
            <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3 h-3" /> Ready for weekly payout
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Escrow Held in Pending</span>
            <div className="text-2xl font-black text-amber-300 mt-0.5">${pendingRevenue}</div>
            <span className="text-[11px] text-amber-400 flex items-center gap-1 mt-1">
              <Clock className="w-3 h-3" /> {pendingRequests.length} proposal(s) awaiting review
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Briefcase className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Response Speed / Rate</span>
            <div className="text-2xl font-black text-indigo-300 mt-0.5">98% / 1.4h</div>
            <span className="text-[11px] text-indigo-400 flex items-center gap-1 mt-1">
              <Zap className="w-3 h-3" /> +35% Algorithmic Ranking Power
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Dashboard Sub-Tabs */}
      <div className="flex border-b border-slate-800 gap-6 text-sm">
        <button
          onClick={() => setDashboardTab('pending')}
          className={`pb-3 font-semibold relative transition-colors ${
            dashboardTab === 'pending' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Pending Proposals ({pendingRequests.length})
          {dashboardTab === 'pending' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />
          )}
        </button>

        <button
          onClick={() => setDashboardTab('active')}
          className={`pb-3 font-semibold relative transition-colors ${
            dashboardTab === 'active' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Active Deliverables ({activeBookings.length})
          {dashboardTab === 'active' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />
          )}
        </button>

        <button
          onClick={() => setDashboardTab('declined')}
          className={`pb-3 font-semibold relative transition-colors ${
            dashboardTab === 'declined' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Declined History ({declinedBookings.length})
          {dashboardTab === 'declined' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />
          )}
        </button>
      </div>

      {/* Concurrency Rule Banner (Question 2 Answer in UI) */}
      <div className="bg-indigo-950/30 border border-indigo-900/50 rounded-xl p-3 flex items-start sm:items-center justify-between gap-3 text-xs text-indigo-200">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>
            <strong>Concurrency Rule:</strong> SkillSwap operates on a non-blocking queue. New clients can submit bookings while you have other requests Pending. You have full discretion to accept up to your capacity limit.
          </span>
        </div>
      </div>

      {/* Bookings Lists by Tab */}
      {dashboardTab === 'pending' && (
        <div className="space-y-4">
          {pendingRequests.length === 0 ? (
            <div className="text-center py-12 bg-slate-900/40 rounded-xl border border-slate-800 text-slate-400 text-sm">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-80" />
              All caught up! You have 0 pending client requests.
            </div>
          ) : (
            pendingRequests.map((b) => (
              <div 
                key={b.id}
                className="bg-slate-900 border border-amber-500/30 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row justify-between gap-5 items-start md:items-center"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-md text-[11px] font-bold">
                      Pending Your Decision
                    </span>
                    <span className="text-xs text-slate-400">{b.id} • Received {b.submittedAt}</span>
                  </div>

                  <h3 className="text-base font-bold text-white">
                    {b.gigTitle}
                  </h3>

                  <div className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                    <strong className="text-slate-400 block mb-1">Client Brief from {b.clientName}:</strong>
                    "{b.brief}"
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                    <span>Rate: <strong className="text-white">${b.price}</strong> (Held in Escrow)</span>
                    <span>Target Delivery: <strong className="text-white">{b.requestedDeliveryDays} Days</strong></span>
                    <span>Client: <span className="text-slate-300">{b.clientEmail}</span></span>
                  </div>
                </div>

                {/* Creator Decision Actions */}
                <div className="flex sm:flex-col gap-2 w-full md:w-auto shrink-0">
                  <button
                    onClick={() => onAcceptBooking(b.id)}
                    className="flex-1 md:w-40 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    Accept Proposal
                  </button>

                  <button
                    onClick={() => onDeclineBooking(b.id)}
                    className="flex-1 md:w-40 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-red-500/20 hover:text-red-300 text-slate-300 border border-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    Decline Scope
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {dashboardTab === 'active' && (
        <div className="space-y-4">
          {activeBookings.length === 0 ? (
            <div className="text-center py-12 bg-slate-900/40 rounded-xl border border-slate-800 text-slate-400 text-sm">
              No active deliverables in progress.
            </div>
          ) : (
            activeBookings.map((b) => (
              <div 
                key={b.id}
                className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row justify-between gap-4 items-start md:items-center"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-md text-[11px] font-bold">
                      In Progress
                    </span>
                    <span className="text-xs text-slate-400">{b.id}</span>
                  </div>

                  <h3 className="text-base font-bold text-white">{b.gigTitle}</h3>
                  <p className="text-xs text-slate-300">Client: <strong>{b.clientName}</strong> ({b.clientEmail})</p>
                  
                  {b.kickoffNote && (
                    <p className="text-xs text-indigo-300 bg-indigo-950/40 p-2.5 rounded-lg border border-indigo-900/40">
                      <strong>Your kick-off note:</strong> "{b.kickoffNote}"
                    </p>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <div className="text-lg font-black text-white">${b.price}</div>
                  <span className="text-xs text-slate-400 block mb-2">Escrow Protected</span>
                  <button className="px-3.5 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500">
                    Upload Final Deliverable
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {dashboardTab === 'declined' && (
        <div className="space-y-4">
          {declinedBookings.length === 0 ? (
            <div className="text-center py-12 bg-slate-900/40 rounded-xl border border-slate-800 text-slate-400 text-sm">
              No declined bookings recorded.
            </div>
          ) : (
            declinedBookings.map((b) => (
              <div 
                key={b.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row justify-between gap-4 items-start"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-md text-[11px] font-semibold">
                      Declined
                    </span>
                    <span className="text-xs text-slate-400">{b.id}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mt-1">{b.gigTitle}</h3>
                  <div className="mt-2 text-xs text-slate-300">
                    <span className="text-red-400 font-semibold">Reason:</span> {b.declineReason}
                    {b.declineNote && <p className="text-slate-400 italic mt-0.5">"{b.declineNote}"</p>}
                  </div>
                </div>

                <div className="text-xs text-slate-400">
                  Client: {b.clientName}
                </div>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
}

function ClientBookingsView({ bookings, gigs, onFindAlternative, onBookAlternativeGig }) {
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = bookings.filter(b => {
    if (statusFilter === 'All') return true;
    return b.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      
      {/* Client Overview Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">My Creator Bookings</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Track milestone progress, review creator kick-off notes, and instant re-match if a creator declines.
          </p>
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          {['All', 'Pending', 'Accepted', 'Declined'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                statusFilter === st
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-dashed border-slate-800">
            <Briefcase className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-slate-300">No bookings match this filter</h3>
            <p className="text-xs text-slate-500 mt-1">Explore the marketplace to book creative talent.</p>
          </div>
        ) : (
          filtered.map((b) => (
            <div 
              key={b.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl transition-all"
            >
              {/* Card Head: Status & Identification */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <img 
                    src={b.creatorAvatar} 
                    alt={b.creatorName} 
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-700" 
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{b.creatorName}</span>
                      <span className="text-[11px] text-slate-400">Order #{b.id}</span>
                    </div>
                    <span className="text-xs text-slate-400">Requested: {b.submittedAt}</span>
                  </div>
                </div>

                {/* Status Badge */}
                <div>
                  {b.status === 'Pending' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 animate-pulse">
                      <Clock className="w-3.5 h-3.5" /> Pending Creator Approval
                    </span>
                  )}
                  {b.status === 'Accepted' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5" /> In Production (Accepted)
                    </span>
                  )}
                  {b.status === 'Declined' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/30">
                      <XCircle className="w-3.5 h-3.5" /> Declined (Escrow Refunded)
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body: Gig Title, Brief & Pricing */}
              <div className="py-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 space-y-3">
                  <h3 className="text-base font-bold text-white">{b.gigTitle}</h3>
                  <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-300">
                    <span className="text-slate-500 block text-[11px] font-medium mb-1">Your Project Brief:</span>
                    {b.brief}
                  </div>

                  {b.kickoffNote && (
                    <div className="bg-emerald-950/20 border border-emerald-900/40 p-3 rounded-xl text-xs text-emerald-300">
                      <span className="font-bold block mb-0.5">Creator Kick-off Message:</span>
                      "{b.kickoffNote}"
                    </div>
                  )}
                </div>

                {/* Financial Details */}
                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/60 flex flex-col justify-between text-xs space-y-2">
                  <div>
                    <div className="flex justify-between text-slate-400">
                      <span>Service Subtotal:</span>
                      <span>${b.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>10% Platform Fee:</span>
                      <span>${b.platformFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white font-bold border-t border-slate-800 pt-1 mt-1 text-sm">
                      <span>Total:</span>
                      <span>${b.totalPaid.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-2 border-t border-slate-800/50">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>SkillSwap Escrow Guarantee active</span>
                  </div>
                </div>
              </div>

              {/* QUESTION 1 SOLUTION: Interactive Recovery Flow on Decline */}
              {b.status === 'Declined' && (
                <div className="mt-2 pt-4 border-t border-red-500/20 bg-red-950/10 -mx-5 -mb-5 p-5 rounded-b-2xl">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-red-400 font-semibold text-xs">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>Why was this declined? Reason: "{b.declineReason}"</span>
                      </div>
                      {b.declineNote && (
                        <p className="text-xs text-slate-300 pl-6">
                          Creator Note: <em>"{b.declineNote}"</em>
                        </p>
                      )}
                      <p className="text-[11px] text-slate-400 pl-6">
                        💳 <strong>100% Escrow Released:</strong> ${b.totalPaid.toFixed(2)} has been instantly refunded to your original payment method.
                      </p>
                    </div>

                    {/* Actionable Next Steps */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onFindAlternative(b)}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>1-Click Similar Creators</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          ))
        )}
      </div>

    </div>
  );
}

function BookGigModal({ gig, onClose, onSubmit }) {
  const [brief, setBrief] = useState('');
  const [clientName, setClientName] = useState('Sarah Jenkins');
  const [clientEmail, setClientEmail] = useState('sarah@growthpulse.agency');
  const [days, setDays] = useState(gig.deliveryDays);

  const subtotal = gig.rate;
  const platformFee = Math.round(gig.rate * 0.10 * 100) / 100;
  const total = Math.round((subtotal + platformFee) * 100) / 100;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!brief.trim()) return;
    onSubmit({
      gig,
      brief,
      clientName,
      clientEmail,
      days
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <XCircle className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Request a Project Booking
        </div>

        <h2 className="text-xl font-bold text-white mb-1">
          {gig.title}
        </h2>

        <div className="flex items-center gap-3 text-xs text-slate-400 pb-4 border-b border-slate-800">
          <img src={gig.creatorAvatar} alt={gig.creatorName} className="w-6 h-6 rounded-full object-cover" />
          <span>Creator: <strong className="text-slate-200">{gig.creatorName}</strong></span>
          <span>• Standard Delivery: <strong className="text-slate-200">{gig.deliveryDays} Days</strong></span>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          
          {/* Brief Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Project Brief & Requirements <span className="text-red-400">*</span>
            </label>
            <textarea
              rows={4}
              required
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              placeholder="Outline your video/graphic vision, target audience, brand tone, and link to raw asset folder (Google Drive, Dropbox)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <span className="text-[11px] text-slate-500">
              Be as specific as possible. The clearer the brief, the faster the creator can accept.
            </span>
          </div>

          {/* Client Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Your Name / Brand</label>
              <input 
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Contact Email</label>
              <input 
                type="email"
                required
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          {/* Escrow Fee Summary */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
            <div className="flex justify-between text-slate-400">
              <span>Creator Base Rate:</span>
              <span className="text-slate-200">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>SkillSwap Protection & Escrow Fee (10%):</span>
              <span className="text-slate-200">${platformFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-white font-bold border-t border-slate-800 pt-2 text-sm">
              <span>Total Authorization:</span>
              <span className="text-indigo-400">${total.toFixed(2)}</span>
            </div>
            <p className="text-[10px] text-slate-500 pt-1">
              🔒 Funds are held safely in escrow. Nothing is paid out until you accept the final work or the creator declines (which triggers an instant refund).
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!brief.trim()}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all"
            >
              Confirm & Lock in Escrow
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

function PostGigModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[1]);
  const [rate, setRate] = useState(60);
  const [deliveryDays, setDeliveryDays] = useState(2);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('Shorts, CapCut, Viral');
  const [maxConcurrency, setMaxConcurrency] = useState(3);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !rate) return;
    onSubmit({
      title,
      category,
      rate,
      deliveryDays,
      description,
      tags,
      maxConcurrentBookings: maxConcurrency
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <XCircle className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <PlusCircle className="w-4 h-4" /> Creator Listing Studio
        </div>

        <h2 className="text-xl font-bold text-white mb-4">
          Monetize Your Creative Skill
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Gig Title <span className="text-red-400">*</span>
            </label>
            <input 
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 5 Viral Short-Form Video Edits with Pacing & Sound Effects"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              >
                {CATEGORIES.filter(c => c !== 'All').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Fixed Flat Rate ($ USD)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">$</span>
                <input 
                  type="number"
                  required
                  min={10}
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-7 pr-3 py-2 text-xs text-white"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Delivery Time (Days)</label>
              <input 
                type="number"
                min={1}
                max={14}
                value={deliveryDays}
                onChange={(e) => setDeliveryDays(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Max Concurrent Active Jobs
              </label>
              <input 
                type="number"
                min={1}
                max={8}
                value={maxConcurrency}
                onChange={(e) => setMaxConcurrency(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
              <span className="text-[10px] text-slate-500">Auto-waitlists once capacity is reached</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Detailed Description & What You Deliver
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail your workflow, revisions included, file formats, and software you specialize in (Premiere, After Effects, DaVinci, Figma)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Skill Tags (comma separated)</label>
            <input 
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Thumbnails, Photoshop, 3D, Blender"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
            />
          </div>

          <div className="bg-indigo-950/30 border border-indigo-900/50 p-3 rounded-xl text-[11px] text-indigo-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0 text-amber-300" />
            <span>
              <strong>Fair-Rotation Boost:</strong> Your gig will receive priority placement for 48 hours to secure your first client reviews without algorithmic disadvantage.
            </span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30"
            >
              Publish Gig to Marketplace
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

function AcceptBookingModal({ booking, onClose, onConfirm }) {
  const [kickoffNote, setKickoffNote] = useState('');

  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
        
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>

        <div className="text-center">
          <h2 className="text-lg font-bold text-white">Accept & Start Milestone</h2>
          <p className="text-xs text-slate-400 mt-1">
            Accepting order <strong>{booking.id}</strong> will formally lock in the deliverable and notify <strong>{booking.clientName}</strong>.
          </p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Kick-off Note to Client (Optional)
          </label>
          <textarea 
            rows={3}
            value={kickoffNote}
            onChange={(e) => setKickoffNote(e.target.value)}
            placeholder="e.g. Thanks for booking! I have reviewed your assets and will share the first cut within 36 hours."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-750"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(kickoffNote)}
            className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20"
          >
            Accept & Lock Escrow
          </button>
        </div>

      </div>
    </div>
  );
}

function DeclineBookingModal({ booking, onClose, onConfirm }) {
  const [selectedReason, setSelectedReason] = useState(DECLINE_REASONS[0].label);
  const [note, setNote] = useState('');

  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
        
        <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto">
          <XCircle className="w-6 h-6" />
        </div>

        <div className="text-center">
          <h2 className="text-lg font-bold text-white">Decline Booking Proposal</h2>
          <p className="text-xs text-slate-400 mt-1">
            SkillSwap provides structured decline reasons so clients understand why and receive immediate escrow refund and alternative recommendations.
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300">
            Select Primary Reason
          </label>
          <div className="space-y-1.5">
            {DECLINE_REASONS.map((r) => (
              <label 
                key={r.id} 
                className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                  selectedReason === r.label 
                    ? 'bg-slate-800 border-indigo-500 text-white' 
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <input 
                  type="radio" 
                  name="declineReason" 
                  checked={selectedReason === r.label} 
                  onChange={() => setSelectedReason(r.label)}
                  className="mt-0.5 text-indigo-500" 
                />
                <div>
                  <span className="font-semibold block">{r.label}</span>
                  <span className="text-[10px] text-slate-500">{r.help}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Polite Note to Client (Optional)
          </label>
          <textarea 
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Brief explanation or recommendation..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500"
          />
        </div>

        <div className="flex gap-3 pt-1">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-750"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(selectedReason, note)}
            className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/20"
          >
            Decline & Release Escrow
          </button>
        </div>

      </div>
    </div>
  );
}

function AlternativeMatchesModal({ rebookingTarget, onClose, onSelectGig }) {
  const { booking, alternatives } = rebookingTarget;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative space-y-4">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <XCircle className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <RefreshCw className="w-3.5 h-3.5" /> 1-Click Instant Alternative Re-Match
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            Available Creators for Your Project
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Since <strong>{booking.creatorName}</strong> declined due to "<em>{booking.declineReason}</em>", here are pre-vetted peer creators who have immediate open slots and similar skills.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          {alternatives.slice(0, 3).map((alt) => (
            <div 
              key={alt.id}
              className="bg-slate-950 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all"
            >
              <div className="flex items-center gap-3">
                <img 
                  src={alt.creatorAvatar} 
                  alt={alt.creatorName} 
                  className="w-12 h-12 rounded-full object-cover ring-1 ring-slate-700" 
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{alt.creatorName}</span>
                    <span className="text-[11px] text-indigo-300 font-medium bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
                      {alt.category}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-300 mt-0.5">{alt.title}</h4>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                    <span className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400" /> {alt.rating} ({alt.reviewsCount})
                    </span>
                    <span>⚡ {alt.deliveryDays}d delivery</span>
                    <span className="text-emerald-400 font-medium">Slots Open Now</span>
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto shrink-0 gap-2">
                <div className="text-base font-black text-white">${alt.rate}</div>
                <button
                  onClick={() => onSelectGig(alt)}
                  className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow transition-colors"
                >
                  Switch & Book
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button 
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white underline"
          >
            Or browse all categories manually
          </button>
        </div>

      </div>
    </div>
  );
}

function ArchitectureExplainerModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative space-y-6">
        
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <XCircle className="w-6 h-6" />
        </button>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" /> SkillSwap Architecture & Economics
          </div>
          <h2 className="text-2xl font-black text-white">
            Marketplace Design & Strategic Solutions
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            How SkillSwap balances creator autonomy, client trust, and platform liquidity.
          </p>
        </div>

        {/* Question 1 Solution */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <span className="w-6 h-6 rounded-full bg-indigo-600/20 flex items-center justify-center text-xs text-indigo-300">1</span>
            <h3>What can a client see and do after a creator declines? Why?</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-white">What they see & do:</strong> When a creator declines, the client receives an instant automated release of held escrow funds, a transparent categorized reason code (e.g., <em>Capacity reached</em>, <em>Scope mismatch</em>, or <em>Timeline too tight</em>), and a <strong>1-Click Alternative Matches drawer</strong> offering 3 similar creators who have verified availability. The client can also edit their brief and resubmit with 1 click.
          </p>
          <div className="p-3 bg-slate-900 rounded-lg text-[11px] text-slate-400 border border-slate-800">
            <strong className="text-emerald-400 block mb-0.5">Why this design:</strong> Traditional marketplaces leave clients ghosted or locked in escrow disputes, causing client churn. Explicit decline reasons eliminate resentment, while instant re-matching converts a potential churn event into an instant second transaction, maintaining marketplace GMV.
          </div>
        </div>

        {/* Question 2 Solution */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <span className="w-6 h-6 rounded-full bg-indigo-600/20 flex items-center justify-center text-xs text-indigo-300">2</span>
            <h3>Can a gig accept a new booking while another is still Pending? Why?</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-white">The Rule:</strong> <strong className="text-emerald-400">YES.</strong> Creator slots remain open in a non-blocking queue until the creator explicitly accepts an order or reaches their self-configured concurrency cap (e.g. max 3 active projects).
          </p>
          <div className="p-3 bg-slate-900 rounded-lg text-[11px] text-slate-400 border border-slate-800">
            <strong className="text-emerald-400 block mb-0.5">Why this design:</strong> If a gig hard-locked whenever a booking was pending, bad actors or slow clients could tie up young creators' schedules without paying. Non-exclusive queues preserve creator earnings, maximize booking velocity, and incentivize creators to review incoming requests promptly.
          </div>
        </div>

        {/* Question 3 Solution */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <span className="w-6 h-6 rounded-full bg-indigo-600/20 flex items-center justify-center text-xs text-indigo-300">3</span>
            <h3>How are gigs ranked on the marketplace page? Why?</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            SkillSwap implements a <strong>Hybrid Meritocratic Fair-Rotation Algorithm</strong> instead of raw review count or pay-to-play ads:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-indigo-400 font-black text-base block">35%</span>
              <span className="text-[10px] text-slate-400">Response Speed & Acceptance</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-emerald-400 font-black text-base block">25%</span>
              <span className="text-[10px] text-slate-400">Verified Client Rating</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-amber-400 font-black text-base block">25%</span>
              <span className="text-[10px] text-slate-400">Fair-Rotation (New Creator Boost)</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-purple-400 font-black text-base block">15%</span>
              <span className="text-[10px] text-slate-400">Price Accessibility</span>
            </div>
          </div>
          <div className="p-3 bg-slate-900 rounded-lg text-[11px] text-slate-400 border border-slate-800">
            <strong className="text-emerald-400 block mb-0.5">Why this design:</strong> Legacy platforms suffer from the "Cold Start Monopoly" where 1% of top creators hoard 90% of bookings. Our 25% Fair-Rotation guarantee gives every new young creator a front-page trial spotlight for 48 hours, cultivating fresh talent while rewarding responsiveness.
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md"
          >
            Understood, Back to SkillSwap
          </button>
        </div>

      </div>
    </div>
  );
}