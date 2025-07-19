import { useState } from "react";
import { useTeamMembers, useTeamTree } from "@/hooks/useTeam";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import AnimatedBackground from "../../components/AnimatedBackground";
import { useSidebar } from "../../hooks/useSidebar";

const MyTeamActive = () => {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 10;

  // Get page type from URL
  const currentPath = window.location.pathname;
  const getPageInfo = () => {
    if (currentPath.includes('/active')) {
      return {
        title: 'Active Team Members',
        description: 'Members who are currently investing and earning',
        apiParams: { status: 'active' as const }
      };
    } else if (currentPath.includes('/inactive')) {
      return {
        title: 'Inactive Team Members',
        description: 'Members who are not currently active',
        apiParams: { status: 'inactive' as const }
      };
    } else if (currentPath.includes('/direct')) {
      return {
        title: 'Direct Team Members',
        description: 'Your direct referrals (Level 1)',
        apiParams: { level: '1' as const }
      };
    } else if (currentPath.includes('/all')) {
      return {
        title: 'All Team Members',
        description: 'Complete team overview',
        apiParams: { status: 'all' as const }
      };
    } else if (currentPath.includes('/tree')) {
      return {
        title: 'Team Tree View',
        description: 'Hierarchical view of your team',
        apiParams: null // Will use tree API
      };
    }
    return {
      title: 'Team Members',
      description: 'Manage your team',
      apiParams: { status: 'all' as const }
    };
  };

  const pageInfo = getPageInfo();

  // API calls based on page type
  const { data: teamMembersData, isLoading: membersLoading, error: membersError } = useTeamMembers({
    ...pageInfo.apiParams,
    limit,
    offset: currentPage * limit,
  });

  const { data: teamTreeData, isLoading: treeLoading, error: treeError } = useTeamTree(5);

  // Use appropriate data based on page type
  const isTreeView = currentPath.includes('/tree');
  const isLoading = isTreeView ? treeLoading : membersLoading;
  const error = isTreeView ? treeError : membersError;
  const members = isTreeView ? [] : (teamMembersData?.data || []);
  const treeData = isTreeView ? teamTreeData : null;

  return (
    <div className="h-screen bg-metax-black text-metax-text-light relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Header */}
      <DashboardHeader
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Sidebar */}
      <DashboardSidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      {/* Main Content */}
      <main
        className={`${isSidebarOpen ? "lg:ml-80" : "lg:ml-0"} h-full overflow-y-auto relative z-10 transition-all duration-300`}
        style={{ paddingTop: "88px" }}
      >
        <div className="p-4 lg:p-6">
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              {pageInfo.title}
            </h1>
            <p className="text-metax-text-muted">
              {pageInfo.description}
            </p>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="bg-metax-dark-section rounded-lg border border-metax-border-gold/30 p-8">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-metax-gold"></div>
                <span className="ml-3 text-metax-text-muted">Loading team data...</span>
              </div>
            </div>
          ) : error ? (
            <div className="bg-metax-dark-section rounded-lg border border-red-500/30 p-8">
              <div className="text-center">
                <div className="text-red-400 mb-2">⚠️ Error Loading Data</div>
                <div className="text-metax-text-muted text-sm">
                  {error instanceof Error ? error.message : 'Failed to load team data'}
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-metax-gold/20 hover:bg-metax-gold/30 text-metax-gold rounded-lg transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : (
            /* Team Members Content */
            <>
              {isTreeView ? (
                /* Tree View */
                <div className="bg-metax-dark-section rounded-lg border border-metax-border-gold/30 p-6">
                  {treeData ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-metax-gold to-metax-gold-dark flex items-center justify-center">
                          <span className="text-metax-black font-semibold text-sm">You</span>
                        </div>
                        <div>
                          <div className="text-metax-text-light font-medium">Your Account</div>
                          <div className="text-metax-text-muted text-sm">Team Leader</div>
                        </div>
                      </div>
                      <div className="text-metax-text-muted text-sm">
                        Total Nodes: {treeData.total_nodes} | Max Levels: {treeData.max_levels}
                      </div>
                      {/* Tree structure would be rendered here based on treeData.tree */}
                      <div className="text-metax-text-muted text-center py-8">
                        Tree visualization coming soon...
                      </div>
                    </div>
                  ) : (
                    <div className="text-metax-text-muted text-center py-8">
                      No tree data available
                    </div>
                  )}
                </div>
              ) : (
                /* Table View */
                <div className="bg-metax-dark-section rounded-lg border border-metax-border-gold/30 overflow-hidden">
                  {members.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-metax-black/50">
                          <tr>
                            <th className="px-6 py-4 text-left text-xs font-medium text-metax-text-muted uppercase tracking-wider">
                              Member
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-metax-text-muted uppercase tracking-wider">
                              Level
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-metax-text-muted uppercase tracking-wider">
                              Join Date
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-metax-text-muted uppercase tracking-wider">
                              Investment
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-metax-text-muted uppercase tracking-wider">
                              Earnings
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-metax-text-muted uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-metax-border-gold/20">
                          {members.map((member) => (
                            <tr key={member.user_id} className="hover:bg-metax-black/30 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-metax-gold to-metax-gold-dark flex items-center justify-center">
                                      <span className="text-metax-black font-semibold">
                                        {member.full_name.charAt(0)}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-metax-text-light">
                                      {member.full_name}
                                    </div>
                                    <div className="text-sm text-metax-text-muted">
                                      @{member.username}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-metax-gold/20 text-metax-gold">
                                  Level {member.level}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-metax-text-light">
                                {new Date(member.joined_at).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-metax-text-light">
                                ${member.total_investment.toLocaleString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-metax-gold">
                                ${member.total_earnings.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                    member.is_active
                                      ? "bg-green-100 text-green-800"
                                      : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {member.is_active ? "Active" : "Inactive"}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-metax-text-muted text-center py-8">
                      No team members found
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* Pagination Controls */}
          {!isTreeView && !isLoading && teamMembersData?.pagination && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-metax-text-muted">
                Showing {teamMembersData.pagination.offset + 1} to{' '}
                {Math.min(
                  teamMembersData.pagination.offset + teamMembersData.pagination.limit,
                  teamMembersData.pagination.total_count
                )}{' '}
                of {teamMembersData.pagination.total_count} members
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                  className="px-4 py-2 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-metax-gold/50 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={!teamMembersData.pagination.has_more}
                  className="px-4 py-2 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-metax-gold/50 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyTeamActive;
